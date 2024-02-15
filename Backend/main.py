from fastapi import FastAPI
# importamos las rutas de tasks
from routes.tasks import taks

##CORSMIDDLEWARE sirve para darle permisos a un dominio para que se pueda conectar con este backend

from fastapi.middleware.cors import CORSMiddleware


## PARA GESIONAR VARIABLES DE ENTORNO INSTALAREMOS DECOUPLE
from decouple import config

app=FastAPI()

ORIGINS=[ ## vamos a guardar todas las rutas a las cuales estan permitidas accedes a este backend
    config("FRONTEND_URL") 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS, ## quienes (dominio) se pueden conectar al backend
    allow_credentials=True,
    allow_methods=["*"], ## metodo al que tiene acceso: POST, PUT, DELETE, etc
    allow_headers=["*"] ## cabeceras que permite content-type, etc. 

)

@app.get("/")
async def welcome():
    return {
        "message":"Welcome FastAPI"
    }

app.include_router(taks)
