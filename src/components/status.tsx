import { useState ,useContext,useEffect} from "react";
import Item from "../model/items";
import DataContext from "../context/dataContext";
import '../style/status.css'

interface Statusprops{
    item:Item
}

export default function Status(props:Statusprops) {
    const data = useContext(DataContext)
    const [isChecked, setisChecked] = useState(props.item.complete)
    async function handlerCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        if (isChecked == false) {
            setisChecked(true)
        }else{
            setisChecked(false)
        }
        
        window.location.reload()
    }
    useEffect(() => {
        changeStatus()
    }, [handlerCheckbox])
    
    
    function changeStatus(){
        data.map((elm:Item)=>{
            if(elm.id==props.item.id){
                props.item.complete = isChecked
                elm.complete = isChecked
                upDateData()
            }
            return
        })
    }
    function upDateData(){
        localStorage.setItem("myList",JSON.stringify(data))
    }
    function deleteTask(){
        for (let i = 0; i < data.length; i++) {
            if(data[i].id==props.item.id){
                data.splice(i,1)
                localStorage.setItem("myList",JSON.stringify(data))
                window.location.reload()
            }
        }
    }
    return (
        <div className={`status form-check form-switch`}>
            <input className={`form-check-input ${props.item.complete ? "bg-success":""}`} type="checkbox" 
            role="switch" id="flexSwitchCheckDefault" checked={props.item.complete} onChange={handlerCheckbox} />
            <button className="deleteTask" onClick={deleteTask}>☒</button>
        </div>
    )
}