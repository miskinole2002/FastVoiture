from pydantic import BaseModel
from sqlmodel import SQLModel,Field


# cette class permet de recevoir un model de donnee venant de react 
class Driver(BaseModel):
    userName:str
    nom:str
    password:str
    email:str
    phone:str
    license_plate:str
    driver_license:str
    image:str

#model de donne venant du formulaire connexion
class Con(BaseModel):
     userName:str
     password:str


# cette classe permet de creer  un modele de table dans la base de donnee
class Drivers(SQLModel,table=True):
     id:int |None=Field(default=None,primary_key=True)
     userName:str
     nom:str
     password:str
     email:str
     phone:str
     license_plate:str
     driver_license:str
     image:str

class Driver_update(BaseModel):
     userName:str
     nom:str
     password:str
     email:str
     phone:str

class Password_update(BaseModel):
      userName:str
      password:str

class Image(BaseModel):
     image:str