import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../contexts/request";
import { useContext } from "react";
import Camera from "./Camera";
import { useState } from "react";
import Login from "./Login";

const User = () => {
  const [X, Setx] = useState(false)
const {SOURCE}=useContext(Api)

  const formSchema = yup.object({
    userName:yup.string().required("le champs est obligatoire"),
    password: yup.string().required("le champs est requis"),
    nom: yup.string().required("le champs est requis"),
    email: yup.string().required("le champs est requis"),
    phone: yup.string().required("le champs est requis"),
    license_plate: yup.string().required("le champs est requis"),
    driver_license: yup.string().required("le champs est requis"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const submit = async (values) => {
          // values.preventDefault()
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
          <input type="text" name="useName" id="username" {...register("userName")}/>
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
        <input type="text" id="email" {...register("email")} />
        </div>
      
        <div>
          <label htmlFor="phone">Numero de telephone </label>
          <input type="text" id="phone" {...register("phone")} />
        </div>
        <div>
          <label htmlFor="license_plate">Licence</label>
          <input type="text" id="license_plate" {...register("license_plate")} />
        </div>
        <div>
          <label htmlFor="driver_license">licence chauffeur</label>
          <input type="text" id="driver_license" {...register("driver_license")} />
        </div> 
        <button type="submit">ajouter</button>
        
      </form>
    </>
  );
};

export default User;
