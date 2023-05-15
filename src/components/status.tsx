import { useState, useContext, useEffect, useReducer } from "react";
import Item from "../model/items";
import DataContext from "../context/dataContext";
import '../style/status.css'

interface Statusprops {
    item: Item
}

export default function Status(props: Statusprops) {
    const data = useContext(DataContext)
    const [isChecked, setisChecked] = useState(props.item.complete)
    const [progress, setprogress] = useState(props.item.progress)
    let color = progressColorCheck()
    async function handlerCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        if (isChecked == false) {
            setisChecked(true)
        } else {
            setisChecked(false)
        }

        window.location.reload()
    }

    useEffect(() => {
        changeStatus()
        updateProgress()
        progressColorCheck()
    }, [handlerCheckbox])

    //Change Progress
    function reducer(state: any, action: any): any {
        switch (action.type) {
            case "plus":
                return setprogress(progress + 20)
            case "minus":
                return setprogress(progress - 20)
        }
    }
    const [result, dispatch] = useReducer(reducer, progress);

    function changeStatus() {
        data.map((elm: Item) => {
            if (elm.id == props.item.id) {
                props.item.complete = isChecked
                elm.complete = isChecked
                upDateData()
            }
            return
        })
    }
    function upDateData() {
        localStorage.setItem("myList", JSON.stringify(data))
    }
    function deleteTask() {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == props.item.id) {
                data.splice(i, 1)
                localStorage.setItem("myList", JSON.stringify(data))
                window.location.reload()
            }
        }
    }
    function updateProgress() {
        data.map((elm: Item) => {
            if (elm.id == props.item.id) {
                props.item.progress = progress
                elm.progress = progress
                upDateData()
            }

        })
    }

    function progressColorCheck() {
        if (progress >= 0 && progress <= 20) {
            return "bg-danger"
        } else if (progress > 20 && progress <= 40) {
            return "bg-warning"
        } else if (progress > 40 && progress <= 60) {
            return "bg-info"
        } else if (progress > 60 && progress <= 80) {
            return "bg-primary"
        } else if (progress > 80 && progress <= 100) {
            return "bg-success"
        }
    }
    return (
        <div className={`status-container form-check form-switch`}>
            <form className="status">
                <label className="container">
                    <input type="checkbox" onChange={handlerCheckbox} checked={props.item.complete}/>
                        <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" {...{ "xml:space": "preserve" }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
                </label>
                <button className="deleteTask" onClick={deleteTask}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg></button>
            </form>
            <div className="progression">
                <button className="btn" type="button" onClick={() => dispatch({ type: "minus" })}>-</button>
                <div className="progress bg-dark" role="progressbar" aria-aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ width: '100px', height: '10px' }}>
                    <div className={`progress-bar ${color}`} style={{ width: `${progress}%` }}></div>
                </div>
                <button className="btn" type="button" onClick={() => dispatch({ type: "plus" })}>+</button>
            </div>
        </div>
    )
}