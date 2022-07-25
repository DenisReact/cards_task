import React from 'react'
import './App.css'
import Card from './components/Card/Card'
import dataJson from '../data.json'
import Filter from './components/Filter/Filter'


const App = () => {
    const [filter, setFilter] = React.useState('newData');
    const [dataEntry, setDataEntry] = React.useState(dataJson)

    const changeStateFilter = (state: string) => setFilter(state)
    const getRemoveHandler = (el:any) => () => setDataEntry(dataEntry => dataEntry.filter(element => element !== el))
    const addCard = () => setDataEntry((old: any) => [...old, "new"])

    const pushNewCard = (obj: any) => () => {
        setDataEntry(old => old.slice(0, old.length - 1))
        setDataEntry(old => [...old, obj]);
    }
    const cancelChangeHandler = () => {
        setDataEntry(old => old.slice(0, old.length - 1))
    }
    

    React.useEffect(() => {
        if(filter === 'newData'){
            const sortData = [...dataEntry];
            sortData.sort((a, b) => {
                let date1: any = new Date(b.startDate)
                let date2: any = new Date(a.startDate)
                return date1 - date2
            })
            setDataEntry(sortData) 
        }else if(filter === "name"){
            const sortData = [...dataEntry];
            sortData.sort((a, b) => {
            let name1 = b.clinicianName
            let name2 = a.clinicianName
            return name2.localeCompare(name1);
            })  
            setDataEntry(sortData) 
        }else if(filter === "oldData"){
            const sortData = [...dataEntry];
            sortData.sort((a, b) => {
                let date1: any = new Date(b.startDate)
                let date2: any = new Date(a.startDate)
                return date2 - date1
            }) 
            setDataEntry(sortData)  
        }
    }, [filter])

    return (
        <div className="cnt">
            <h2>All Entry</h2>
            <Filter onChangeFilter={changeStateFilter} />
            <div className="cards">
                {
                    dataEntry.map((el, index) => <Card onCancelChange={cancelChangeHandler} onPushNewCard={pushNewCard} onRemove={getRemoveHandler(el)} key={`entry_${index}`} dataEntry={el} />)
                }
            </div>
            <button className="addCard" onClick={addCard}>+</button>
        </div>
    )
}

export default App