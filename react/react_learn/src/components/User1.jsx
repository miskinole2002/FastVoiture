import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../contexts/request";
import { useContext } from "react";
import { useCallback } from "react";
import Webcam from "react-webcam";
import React, { useState } from "react";

const videoConstraints = {
  width: 440,
  height: 440,
  facingMode: "user"
};

const User1 = () => {
 

const {SOURCE}=useContext(Api)

  
 


  // console.log(imageSrc)


  const formSchema = yup.object({
    userName:yup.string().required("le champs est obligatoire"),
    password: yup.string().required("le champs est requis"),
    nom: yup.string().required("le champs est requis"),
    email: yup.string().required("le champs est requis"),
    phone: yup.string().required("le champs est requis"),
    license_plate: yup.string().required("le champs est requis"),
    driver_license: yup.string().required("le champs est requis"),
    image: yup.string()

  });  
  
  const webcamRef=React.useRef()
  const capture = useCallback(async(e) => {
      e.preventDefault()
      const image = webcamRef.current.getScreenshot();

     
      setValue("image", image)
  }, [webcamRef]);



  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm({ resolver: yupResolver(formSchema) });

  const submit = async (values) => {
    
    console.log(values);
    const response= await fetch(`${SOURCE}/`, {
        
        method:"POST",

        headers:{"Content-Type":"application/json"},

        body:JSON.stringify(values),//permet de transformer un objet json en string 
    });
    const data= await response.json()
    console.log('reponse:',data)
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="username"> non d'utilisateur</label>
          <input type="text" name="useName" id="username" {...register("userName")} />
        </div>
        <div>
          <label htmlFor="nom">Nom </label>
        <input type="text" id="nom" {...register("nom")} />
        </div>
        <div>
          <label htmlFor="password">mot de passe</label>
        <input type="text" id="password" {...register("password")} />
        </div>
        <div>
          <label htmlFor="eamil">adresse email</label>
        <input type="text" id="email"  {...register("email")} />
        </div>
      
        <div>
          <label htmlFor="phone">Numero de telephone </label>
          <input type="text" id="phone"{...register("phone")} />
        </div>
        <div>
          <label htmlFor="license_plate">Licence</label>
          <input type="text" id="license_plate"{...register("license_plate")} />
        </div>
        <div>
          <label htmlFor="driver_license">licence chauffeur</label>
          <input type="text" id="driver_license"{...register("driver_license")}  />
        </div> 
        <div>
        <input type="hidden" id="image"{...register("image")}  />
        </div>
       
       
        <button type="submit">ajouter</button>
        
      </form>
      <div>
        <Webcam
   
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints} />
        <button  onClick={capture}>capturer </button>
        </div>
    </>
  );
};

export default User1;
