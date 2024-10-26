import { useContext } from "react"
import Api from "../contexts/request"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


const Login=()=>{
    const{SOURCE}=useContext(Api)

    const formSchema = yup.object({
      userName: yup.string().required("le champs est requis "),
      password: yup.string().required("le champs est requis"),
    });

    const {
      handleSubmit,
      register,
      formState: { errors },
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
        <button type="submit">connexion</button>

        </form>

    </div>)
}

export default Login