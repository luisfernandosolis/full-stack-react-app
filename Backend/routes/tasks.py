from fastapi import APIRouter,HTTPException
from database import get_task_all, create_task_once, get_task_once, delete_task_once, update_task_once
from models import Task,UpdateTask
from bson import ObjectId

taks=APIRouter()

@taks.get("/api/tasks")
async def get_tasks():
    tasks=await get_task_all()
    return [{
            "id":str(task["_id"]),
            "title":task["title"],
            "description":task["description"],
            "completed":task["completed"]
        } for task in tasks]


@taks.post("/api/task")
async def create_task(task: Task):
    print(task)
    response = await create_task_once(task.__dict__)
    
    if response:
        return {
            "id":str(response["_id"]),
            "title":response["title"],
            "description":response["description"],
            "completed":response["completed"]
        }
    raise HTTPException(400,"Ocurrió un error al registrar")

@taks.get("/api/task/{id_task}")
async def get_task(id_task: str):

    response=await get_task_once(ObjectId(id_task))
    print("Objetct ID: ",type(ObjectId(id_task)))
    print("response: ",response)
    if response:
        return {
            "id":str(response["_id"]),
            "title":response["title"],
            "description":response["description"],
            "completed":response["completed"]
        }
    raise HTTPException(404,f"Ocurrió un error al encontrar el id {id_task}")



@taks.put("/api/task/{id_task}")
async def put_task(id_task, task:UpdateTask):
    print(task)
    response = await update_task_once(ObjectId(id_task),task)
    if response:
        return {
            "id":str(response["_id"]),
            "title":response["title"],
            "description":response["description"],
            "completed":response["completed"]
        }
    raise HTTPException(404,f"Ocurrió un error al encontrar el id {id_task}")



@taks.delete("/api/task/{id_task}")
async def remove_task(id_task):
    response=await delete_task_once(ObjectId(id_task))
    if response:
        return "Registro eliminado satisfatoriamente"
    raise HTTPException(404,f"Ocurrió un error al eliminar el id {id_task}")