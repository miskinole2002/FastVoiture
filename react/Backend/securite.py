from passlib.context import  CryptContext
from datetime import datetime
import base64
context=CryptContext(schemes=["pbkdf2_sha256","des_crypt"],deprecated="auto")
def password_hash(password):

    return context.hash(password)

def password_verify(password,hash_password):
    return context.verify(password,hash_password)

def decode(I):
     imag=base64.b64decode(I.split(",")[1])
     
     current_time=datetime.now()
     
     name=current_time.strftime("%H-%M-%S")
     

     image_name = f"{name}.jpg"


     


     
     path=f".\images\{image_name}"
     
     with open(path,'wb') as f:
          f.write(imag)
     
     return path

