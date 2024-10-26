
from fastapi import FastAPI,Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from sqlmodel import SQLModel,create_engine,Session
from typing import Annotated
from.securite import password_hash,password_verify
from.models import Driver,Con,Drivers,Driver_update,Password_update
app=FastAPI()
app.add_middleware ( CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]) #permet la communication avec react 

# connection a la Base de donnees
url="mssql+pyodbc://(LocalDB)\\MSSQLLocalDB/FastVoiture?driver=ODBC+Driver+17+for+SQL+Server" 
engine=create_engine(url)

#creation de tables
def create_table():
     SQLModel.metadata.create_all(engine)
    
def get_session():
     with Session(engine) as session:
          yield session
SessionDep=Annotated[Session,Depends(get_session)]


@app.on_event("startup")
async def on_startup():
     create_table()


def user_verify(item,session:SessionDep):
     users=session.query(Drivers).filter(Drivers.userName==item).first()
     return users
     

@app.post("/")
async def Register (user:Driver,session:SessionDep):
        new_user=Drivers(
             userName=user.userName,
             password=password_hash( user.password),
             nom=user.nom,
             email=user.email,
             phone=user.phone,
             license_plate=user.license_plate,
             driver_license=user.driver_license)
        
        if user_verify(new_user.userName,session):
             response={"message":"nom d'utiliateur deja existant "}
        else:
             
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            response={"message":"bien ajoute","user":new_user}
        return response
        
@app.post("/Login")
async def connexion(user:Con, session:SessionDep):
       new_user=Drivers(userName=user.userName,password=user.password)
       
       users=session.query(Drivers).filter(Drivers.userName==new_user.userName).first()
       
       if users:
            verify=password_verify(new_user.password,users.password)
            
            if verify:
                return{"message":"bonne connexion"}
            else:
                 return{"message":"mot de passe incorrect"}

       else:
            return{"message":"personne inexistante"}
       
@app.post("/update")
async def update(user:Driver_update,session:SessionDep):
     exist_user=user_verify(user.userName,session) # permet de faire la recherche dans la bd en fonction du userName
     if exist_user:
          user_model=Driver_update(userName=user.userName,
                             nom=user.nom,
                             password=password_hash( user.password),
                             email=user.email,
                             phone=user.phone)
          user_data=user_model.model_dump(exclude_unset=True) 
          exist_user.sqlmodel_update(user_data)
          session.add(exist_user)
          session.commit()
          session.refresh(exist_user)
          reponse={'message':'element modifie '}
     else:
          reponse={'message':' persone inexistante '}
          

     return reponse

@app.post('/update_password')
async def update_password(user:Password_update,session:SessionDep):
     exist_user=user_verify(user.userName,session)
     if exist_user:
          user_model=Password_update(
               userName=user.userName,
               password=password_hash( user.password)
               )
          user_data=user_model.model_dump(exclude_unset=True) 
          exist_user.sqlmodel_update(user_data)
          session.add(exist_user)
          session.commit()
          session.refresh(exist_user)
          reponse={'message':'mot de passe  modifie '}
     else:
          reponse={'message':' persone inexistante '}

     return reponse
         
if __name__=="__name__":
    
    uvicorn.run(app,host="0.0.0.0", port=8022, workers=1)