// para crear variables usaremos useState

import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import {fetchTask, createTask,updateTask,deleteTask} from '../api/tasks'


function TaskForm(){
    const [title, setTitle] = useState('')
    const [description, setDescription]  = useState('')

    const params= useParams()
    //console.log(params)

    const navigate = useNavigate()


    const handleSubmit = async (e)=>{
        // cancelar el comportamiento por defecto del formulario
        e.preventDefault()

        console.log(title,description)
        // enviar los datos al backend

            /* una forma de hacer post
        const response = await fetch("http://127.0.0.1:8000/api/task",{
            method:"POST",
            body:JSON.stringify({
                title,
                description
            }),
            headers:{"content-type":"application/json"}
        })*/
        /* Otra forma más facil es con axios  */

        
        try {
            if (!params.id){
                const response = await createTask({title,description})
                console.log(response)
            }else{
                const response = await updateTask(params.id,{title,description})
                console.log(response)
            }
            navigate("/")
        } catch (error) {
            console.log(error)
            
        }
        

        // para limpiar el formulario
        e.target.reset()
        

        

    };

    useEffect(()=>{
        console.log("Title task ", title)
        if (params.id){
            // ejecutamos una funcion
            fetchTask(params.id)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description)
            })
            .catch((err) => console.log(err))
        }
        
    }, [])

    

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <div>
            <form action="" className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <h1 className='text-white py-5 px-5'>Create Task</h1>
                <input 
                    value={title}
                    type="text" 
                    placeholder="title" 
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus

                />
                <textarea 
                    placeholder="description" 
                    className="block py-2 px-3 mb-4 w-full text-black"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
   
                >

                </textarea>
                <button>
                   
                    {params.id ? "Update Task":"Create Task"}
                </button>
            </form>
            {
                params.id && (
            
            <button className='bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded mt-5'
                    onClick={async () => {
                        try {
                            const response = await deleteTask(params.id)
                            console.log(response);
                            navigate("/")

                        } catch (error) {
                            console.log(error)
                            
                        }
                        
                    }}
            >
                Delete
            </button>)}
            </div>
        </div>
    )
}

export default TaskForm