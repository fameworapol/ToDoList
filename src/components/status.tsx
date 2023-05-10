import { useState ,useContext,useEffect} from "react";
import Item from "../model/items";
import DataContext from "../context/dataContext";

interface Statusprops{
    item:Item
}

export default function Status(props:Statusprops) {
    const data = useContext(DataContext)
    const [isChecked, setisChecked] = useState(props.item.complete)
    async function handlerCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("before :",isChecked);
        if (isChecked == false) {
            setisChecked(true)
            //console.log(isChecked); 
        }else{
            setisChecked(false)
            //console.log("change");
        }
        //console.log("after :",isChecked);
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
        console.log(props.item.complete)
    }
    function upDateData(){
        localStorage.setItem("myList",JSON.stringify(data))
    }
    return (
        <div className={`form-check form-switch`}>
            <input className={`form-check-input ${props.item.complete ? "bg-success":""}`} type="checkbox" 
            role="switch" id="flexSwitchCheckDefault" checked={props.item.complete} onChange={handlerCheckbox} />
        </div>
    )
}