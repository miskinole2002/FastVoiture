import React, { useContext } from "react"
import Api from "../contexts/request"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 440,
  height: 440,
  facingMode: "user"
};

const Login=()=>{
    const{SOURCE}=useContext(Api)

    const webcamRef=React.useRef()
    const capture = useCallback(async(e) => {
        e.preventDefault()
        const image = webcamRef.current.getScreenshot();
  
       
        setValue("image", image)
    }, [webcamRef]);

    const formSchema = yup.object({
      userName: yup.string().required("le champs est requis "),
      password: yup.string().required("le champs est requis"),
    });

    const {
      handleSubmit,
      register,
      formState: { errors },
      setValue
    } = useForm({ resolver: yupResolver(formSchema) });
    const submit=async(values)=>{
      // values.preventDefault()
      console.log(values);
       const response=await fetch(`${SOURCE}/Login`, {

         method:"POST",

         headers:{"Content-Type":"application/json"},

         body:JSON.stringify(values)
      });
     const data= await response.json()
     console.log('reponse:',data)
     }
    
    return (
    <div>
        <form action="" onSubmit={handleSubmit(submit)} >
        <div>
          <label htmlFor="userName">nom d'utilisateur</label>
          <input type="text" id="userName"  {...register("userName")}  />
        </div>
        <div>
          <label htmlFor="password">mot de passe </label>
          <input type="text" id="password" {...register("password")}  />
        </div>
        <input type="hidden" id="image"{...register("image")}  />

        <button type="submit">connexion</button>

        </form>
        <Webcam
   
   audio={false}
   height={720}
   ref={webcamRef}
   screenshotFormat="image/jpeg"
   width={1280}
   videoConstraints={videoConstraints} />
 <button  onClick={capture}>capturer </button>

    </div>)
}

export default Login