import React, {useState, useEffect} from 'react'
import './Card.css'


const Card = ({...props}: any) => {
    const startDay: Date = new Date(props.dataEntry.startDate);
    const endDay: Date = new Date(props.dataEntry.endDate);

    const month: number = startDay.getMonth();
    const day: number = startDay.getDate()
    const hour: number = startDay.getHours()
    const minutes: number = startDay.getMinutes();

    const addZero = (value:number, number:number) => value > number ? value : `0${value}`;

    const dateEvent: string = `${addZero(month, 8)}/${day}/${startDay.getFullYear()}`;
    const timeEvent: string = `${hour}:${addZero(minutes, 10)}`;

    let differenceHour: number = endDay.getHours() - hour;
    const differenceMinutes: number = endDay.getMinutes() - minutes;
    
    const subtractTime = () => {
            --differenceHour;
            return endDay.getMinutes() + 60 - minutes;
    }

    const durationMinutes: any = 
        endDay.getMinutes() >= minutes ? 
        addZero(minutes, 9) :  
        subtractTime();
    const duration: string = `${differenceHour > 9  ? differenceHour : `0${differenceHour}`}:${durationMinutes}`;
 

    const [nameClinicial, setNameClinicial] = useState("Lorem Lorem");
    const [dataStart, setDataStart] = useState("2022-01-15");
    const [timeStart, setTimeStart] = useState("18:00");
    const [durationSession, setDurationSession] = useState("01:30");
    
    const nameHendler = (event:any) => setNameClinicial(event.target.value)
    const dateHendler = (event:any) => setDataStart(event.target.value)
    const timeHendler = (event:any) => setTimeStart(event.target.value)
    const durationHendler = (event:any) => setDurationSession(event.target.value)

    const [current, setCurrent] = useState(false)
    const [currentObj, setCurrentObj] = useState({
        id: "",
        startDate: "",
        endDate: "",
        clinicianName: "",
        patient: {
          id: "",
          name: ""
        },
        status: ""
    });

    useEffect(() => {
        if(
           /^\w+\s\w+$/.test(nameClinicial) &&
           /^[0-2][0-9]\:[0-6][0-9]$/.test(timeStart) &&
           Number(timeStart.match(/^\d\d/)) <= 24 &&
           Number(timeStart.match(/\d\d$/)) <= 59 &&
           /^[0-2][0-9]\:[0-6][0-9]$/.test(durationSession) &&
           Number(durationSession.match(/^\d\d/)) <= 24 &&
           Number(durationSession.match(/\d\d$/)) <= 59
        ){
            setCurrent(true)
        }else{
            setCurrent(false)
        }

        const date = new Date(dataStart);
        const hourDate = Number(timeStart.match(/^\d\d/));
        const minutesDate = Number(timeStart.match(/\d\d$/));

        const hourDuration = Number(durationSession.match(/^\d\d/));
        const minutesDuration = Number(durationSession.match(/\d\d$/));

        setCurrentObj({ 
            id: `${Math.random()}`,
            startDate: `${new Date(date.setHours(hourDate, minutesDate))}`,
            endDate: `${new Date(date.setHours(hourDate + hourDuration, minutesDate + minutesDuration))}`,
            clinicianName: `${nameClinicial}`,
            patient: {
                id: `${Math.random()}`,
                name: "Aaron Burr"
            },
            status: "ACTIVE"
        })
        
    }, [nameClinicial, dataStart, timeStart, durationSession])


    return (
        <>
            {
                props.dataEntry !== "new" ? 
                (
                    <div className={differenceHour >= 1 && differenceMinutes > 0   ? 'card active' : 'card'}>
                        <p>{props.dataEntry.clinicianName}</p>
                        <div className="dats">
                            <small>Data start: <span>{dateEvent}</span></small>
                            <small>Time start: <span>{timeEvent}</span></small>
                            <small>Duration: <span>{duration}</span></small>
                            
                        </div>
                        <button className="remove" onClick={props.onRemove}>
                            <img src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/exit-delete-remove-close-x-256.png" alt="" />
                        </button>
                    </div>
                ) : 
                (
                    <div className='card'>
                        <p>Clinicial Name: <input type="text" value={nameClinicial} onChange={nameHendler} placeholder=' Lorem Lorem' /></p>
                        <div className="dats">
                            <small>Data start: 
                                <span>
                                    <input type="date" value={dataStart} onChange={dateHendler}/>
                                </span>
                            </small>
                            <small>Time start: 
                                <span>
                                    <input type="text" value={timeStart} onChange={timeHendler} placeholder=' hour : minutes (10:00)'/>
                                </span>
                            </small>
                            <small>Duration: 
                                <span>
                                    <input type="text" value={durationSession} onChange={durationHendler}  placeholder=' hour : minutes (01:50)'/>
                                </span>
                            </small>
                            
                        </div>

                        <div className="control">
                            <button className={current ? "save active" : "save"} onClick={props.onPushNewCard(currentObj)}>Save</button>
                            <button className="delete" onClick={props.onCancelChange}>Delete</button>
                        </div>
                        
                    </div>
                )
            }
        </>
    )
}

export default Card
