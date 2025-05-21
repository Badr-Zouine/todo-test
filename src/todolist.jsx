import react,{useState, useEffect} from "react";

function ToDoList(){
    const [tasks, setTasks] = useState(() =>{
                                                const saved = localStorage.getItem('tasks'); // Get saved todos from localStorage
                                                return saved ? JSON.parse(saved) : [];       // If there are saved todos, parse them from JSON; otherwise return an empty array
                                            });
    const [newtask, setNewtask] = useState("");

    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));}, [tasks]);// Save current todos to localStorage as a JSON string


    function handleInputChange(event){
        setNewtask(event.target.value);
    

    }
    function addTask(){
        if(newtask.trim() !==""){
            setTasks(tasks=>[...tasks,newtask]);
            setNewtask("");
        }
    }
    function deleteTask(index){
        const updatedtasks = tasks.filter((_,i)=> i!==index);
        setTasks(updatedtasks);
    }
    function moveTAskUp(index){
        if(index>0){
            const updatedtasks= [...tasks];
            [updatedtasks[index],updatedtasks[index-1]]=[updatedtasks[index-1],updatedtasks[index]];
            setTasks(updatedtasks);
        }

    }
    function moveTAskDown(index){
        if(index < tasks.length-1){
            const updatedtasks= [...tasks];
            [updatedtasks[index],updatedtasks[index+1]]=[updatedtasks[index+1],updatedtasks[index]];
            setTasks(updatedtasks);
        }

    }


    return(
        <div className="to-do-list">
            <h1>To Do List</h1>
            <div>
                <input type="text" placeholder="Enter a task..." value={newtask} onChange={handleInputChange} onKeyDown={e => {if (e.key === 'Enter'){addTask();}}}/>
                <button className="add-button" onClick={addTask}>add</button>

            </div>
            <ol>
                {tasks.map((task, index) =>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-button" onClick={()=> deleteTask(index)}>delete</button>
                    <button className="move-button" onClick={()=> moveTAskUp(index)}>👆</button>
                    <button className="move-button" onClick={()=> moveTAskDown(index)}>👇</button>
                </li>
                
                )}
            </ol>

        </div>)
}

export default ToDoList;