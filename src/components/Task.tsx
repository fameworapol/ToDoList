import React, { useState } from "react";
import Item from "../model/items"
import '../style/Task.css'
import Status from "./status";
interface TaskItem {
    items: Item[]
}
export default function Task(props: TaskItem): JSX.Element {
    return (
        <div className="task-container">
            <ul>
                {props.items.map((elm) => {
                    return (
                        <div className="card">
                            <li><h4>{elm.name}</h4></li>
                            <Status item={elm}/>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}