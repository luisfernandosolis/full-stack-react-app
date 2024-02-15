from motor.motor_asyncio  import AsyncIOMotorClient
from models import Task

client=AsyncIOMotorClient("mongodb://localhost")
database = client.taskdatabase

collection=database.tasks




async def get_task_all():
    tasks=[]
    cursor  = collection.find({})
    async for document in cursor:
        tasks.append(document)
    return tasks

async def create_task_once(task):
    new_task = await collection.insert_one(task)
    created_task=await collection.find_one({"_id":new_task.inserted_id})
    return created_task

async def get_task_once(id):
    task = await collection.find_one({"_id":id})
    return task


async def update_task_once(id, data):
    task ={k:v for k,v in data.__dict__.items() if v is not None} # convertimos a un dictionario solo los valores que cambian
    await collection.update_one({"_id":id},{"$set":task} )
    document = await collection.find_one({"_id":id})
    return document

async def delete_task_once(id):
    await collection.delete_one({"_id":id})
    return True