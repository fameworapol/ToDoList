import { useState } from "react";
import Task from "./components/Task";
import Item from "./model/items";
import TaskForm from "./components/TaskForm";
import '../src/style/App.css'

function App() {
  const [item, setItem] = useState<Item[]>([]); //รับค่าเก็บค่าเป็น array ที่มีโครงสร้างเป็น interface Item
  function generatedID(){
    //random 0-999
    return Math.floor(Math.random()*100000)
  }
  function onAddItem(name:string){
    let key = generatedID()
    setItem([...item,{id:key,name:name,complete:false}])
    const itemJson = JSON.stringify(item)
    localStorage.setItem("item",itemJson)
  }
  return (
    <div className="App-container">
      <h1>TO DO LIST</h1>
      <Task items={item}/>
      <TaskForm onAddItem={onAddItem}/>
    </div>
  );
}

export default App;
