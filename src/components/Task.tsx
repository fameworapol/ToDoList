import Item from "../model/items"
import '../style/Task.css'
interface TaskItem{
    items:Item[]
}
export default function Task(props:TaskItem):JSX.Element {
    
    return (
        <div className="task-container">
            <ul>
                {props.items.map((elm)=>{
                    return <div className="check"><li>{elm.name}</li><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked={elm.complete}/></div>
                })}
            </ul>
        </div>
    )
}