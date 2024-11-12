import cv2,numpy as np
import face_recognition

# fonction qui extrait les caracteristique de l'image dans la BD 
def extractFeatures_bd(path):
    
    
    curImg=cv2.imread(path)
    img=cv2.cvtColor(curImg,cv2.COLOR_BGR2RGB)
    try:
       feature=face_recognition.face_encodings(img)[0]
    except:
        print('erreur')
    
    return feature

#fonction qui extrait les caracteristiques de l'image de la connexion et qui compare avec celle de la bd 
def face_detetion(path,encode_bd): 
    curImg=cv2.imread(path)
    
    #on convertir l image en bgr
    img=cv2.cvtColor(curImg,cv2.COLOR_BGR2RGB)
    #on detecte la face 
    face_curent=face_recognition.face_locations(img)
    print(face_curent)
    
    if face_curent is None:
        raise ValueError("Aucune face détectée dans l'image.")

    else :
        #on encode 
        face_encode=face_recognition.face_encodings(img,face_curent)[0]
   #on compare
        match=face_recognition.compare_faces([encode_bd],face_encode)
        print(match)
        return match
     