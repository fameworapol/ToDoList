import React, { useRef } from "react"
import '../style/TaskForm.css'
import Item from "../model/items"

interface AddItemProp {
    onAddItem: (name: string) => void
}
export default function TaskForm({ onAddItem }: AddItemProp) {
    const inputRef = useRef<HTMLInputElement>(null)

    function saveData(e: React.FormEvent) {
        e.preventDefault()
        const name = inputRef.current!.value
        onAddItem(name)
        inputRef.current!.value = "";
    }
    return (
        <div className="taskform-component">
            <form onSubmit={saveData} className="taskform">
                {/* <input type="text" id="task" className="form-control" ref={inputRef}/> */}
                <div className="input-container">
                    <input className="input" name="text" type="text" ref={inputRef} />
                    <label className="label" htmlFor="input">Enter Your Task</label>
                    <div className="topline"></div>
                    <div className="underline"></div>
                </div>
                {/* <button type="submit" className="btn btn-primary" style={{ fontWeight: "bolder", borderRadius: "100px" }}>+</button> */}
                <button>
                    <span className="button_top">Add Task</span>
                </button>
            </form>
        </div>
    )
}