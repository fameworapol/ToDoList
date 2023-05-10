import { useEffect, useState } from "react";
import Task from "./components/Task";
import Item from "./model/items";
import TaskForm from "./components/TaskForm";
import '../src/style/App.css'
import DataContext from "./context/dataContext";
function App() {
  function readData() {
    const myList = localStorage.getItem("myList")
    if(myList == null){
      return []
    }
    return JSON.parse(myList)
  }

  const [item, setItem] = useState<Item[]>(readData()); //รับค่าเก็บค่าเป็น array ที่มีโครงสร้างเป็น interface Item
  useEffect(() => {
    setItem(readData())
  }, [])
  
  function generatedID(){
    //random 0-999
    return Math.floor(Math.random()*100000)
  }
  function onAddItem(name:string){
    let key = generatedID()
    const newTask:Item = {name:name,id:key,complete:false}
    item.push(newTask)
    //setItem([...item,{id:key,name:name,complete:false}])
    localStorage.setItem("myList",JSON.stringify(item))
    window.location.reload()
  }
  return (
    <div className="App-container">
      <DataContext.Provider value={item}>
        <h1>TO DO LIST</h1>
        <Task items={item}/>
        <TaskForm onAddItem={onAddItem}/>
      </DataContext.Provider>
    </div>
  );
}

export default App;
