import {useEffect, useState} from 'react'
import axios from 'axios'
import Tasklist from '../components/TaskList'


function HomePage(){

    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        async function fetchTask(){
            const response = await axios.get("http://127.0.0.1:8000/api/tasks")
            setTasks(response.data)
        }
        fetchTask();
    }, []);
    
    return (
        <div>
            <Tasklist tasks={tasks}/>
        </div>
        
        
    )
}

export default HomePage