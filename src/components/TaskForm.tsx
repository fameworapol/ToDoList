import React, { useRef } from "react"
import '../style/TaskForm.css'
interface AddItemProp{
    onAddItem:(name:string)=>void
}
export default function TaskForm({onAddItem}:AddItemProp){
    const inputRef = useRef<HTMLInputElement>(null)
    function saveData(e:React.FormEvent) {
        e.preventDefault()
        const name = inputRef.current!.value
        onAddItem(name)
        inputRef.current!.value = "";
    }
    console.log(inputRef.current?.value);
    
    return (
        <div className="taskform-component">
            <form onSubmit={saveData} className="taskform">
                <input type="text" id="inputPassword5" className="form-control" ref={inputRef}/>
                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}