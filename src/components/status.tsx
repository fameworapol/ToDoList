import { useState, useContext, useEffect,useReducer } from "react";
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
    function reducer(state:any,action:any) :any{
        switch(action.type){
            case "plus":
                return setprogress(progress+20)
            case "minus":
                return setprogress(progress-20)
        }
    }
    const [result, dispatch] = useReducer(reducer,progress);

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
        if(progress>=0&&progress<=20){
            return "bg-danger"
        }else if(progress>20&&progress<=40){
            return "bg-warning"
        }else if(progress>40&&progress<=60){
            return "bg-info"
        }else if(progress>60&&progress<=80){
            return "bg-primary"
        }else if(progress>80&&progress<=100){
            return "bg-success"
        }
    }
    return (
        <div className={`form-check form-switch`}>
            <form className="status">
                <input className={`form-check-input ${props.item.complete ? "bg-success" : ""}`} type="checkbox"
                    role="switch" id="flexSwitchCheckDefault" checked={props.item.complete} onChange={handlerCheckbox} />
                <button className="deleteTask" onClick={deleteTask}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg></button>
            </form>
            <div className="progression">
                <button className="btn btn-primary" type="button" onClick={()=>dispatch({type:"minus"})}>-</button>
                <div className="progress bg-dark" role="progressbar" aria-aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{ width: '100px', height: '15px'}}>
                    <div className={`progress-bar ${color}`} style={{ width: `${progress}%` }}></div>
                </div>
                <button className="btn btn-primary" type="button" onClick={()=>dispatch({type:"plus"})}>+</button>
            </div>

        </div>
    )
}