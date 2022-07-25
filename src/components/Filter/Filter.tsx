import React from 'react'
import './Filter.css'


const Filter = (props: {onChangeFilter: any}) => {
    const thumb = React.useRef(null);

    const click_button = (state: string, index: number) => () => {
        props.onChangeFilter(state);
        thumb.current.style.left = `${34 * index}%`
    }
    return (
        <div className='filter'>
            <p>Filter</p>
            <div className="blocks">
                <button onClick={click_button("newData", 0)}>New Data</button>
                <button onClick={click_button("oldData", 1)}>Old data</button>
                <button onClick={click_button("name", 2)}>Name of clinician name</button>
                <div className="thumb" ref={thumb}></div>
            </div>
        </div>
    )
}

export default Filter
