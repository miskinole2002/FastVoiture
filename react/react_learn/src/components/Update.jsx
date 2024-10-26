import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Api from "../contexts/request";
import { useContext } from "react";

const Update=()=>{
    
    const {SOURCE}=useContext(Api)

    const formSchema = yup.object({
        userName:yup.string().required("le champs est obligatoire"),
        password: yup.string().required("le champs est requis"),
        nom: yup.string().required("le champs est requis"),
        email: yup.string().required("le champs est requis"),
        phone: yup.string().required("le champs est requis"),
      
      });

      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm({ resolver: yupResolver(formSchema) });

      const submit = async (values) => {
       
  const response= await fetch(`${SOURCE}/update`, {
      
      method:"POST",

      headers:{"Content-Type":"application/json"},

      body:JSON.stringify(values),
  });
  const data= await response.json()
  console.log('reponse:',data)
}
    return(
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
        
        <button type="submit">modifier</button>
        
      </form>

    </>)
}
export default Update