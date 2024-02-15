// Para las navegaciones importaremos el modulo Navigate

import {useNavigate} from 'react-router-dom'




function TaskCard({task}){

    const navigate = useNavigate()

    return(
        <div 
        className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950"
        onClick={()=> {
            navigate(`/task/${task.id}`)
        }}
        >
            <h2>{task.title}</h2>
            <h2>{task.description}</h2>
        </div>
    )
}

export default TaskCard