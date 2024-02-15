from pydantic import BaseModel, Field
from typing import Optional


class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description : Optional[str] = None
    completed : bool = False

class UpdateTask(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    description : Optional[str] = None
    completed : Optional[bool] = None
