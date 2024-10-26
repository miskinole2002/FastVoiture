import cv2
import face_recognition

# on load les images

image1= cv2.imread("images\william.png")
image2= cv2.imread("images\img2.jpg")

#on transforme en RGB
image1_rgb=cv2.cvtColor(image1,cv2.COLOR_BGR2RGB)
image2_rgb=cv2.cvtColor(image2,cv2.COLOR_BGR2RGB)




#on localise la face 
face1=face_recognition.face_locations(image1_rgb)
face2=face_recognition.face_locations(image2_rgb)

# on encode 
face_enc1=face_recognition.face_encodings(image1_rgb)[0]
face_enc2=face_recognition.face_encodings(image1_rgb,face1)

# # on compare
# for face in face_enc2:

#     match=face_recognition.compare_faces(face_enc1,face)




#     print(match)

print(f"1{face_enc1}")
print(f"2{face_enc2}")

