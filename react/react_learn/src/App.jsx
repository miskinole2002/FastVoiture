import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import User from './components/User'
import Update from './components/Update'
import Camera from './components/Camera'

function App() {
  const [count, setCount] = useState(0)
const [con,SetCon]=useState(false)
    

  return (
    <>
     {/* <a onClick={(e)=>{
         // alert(e)
          e.preventDefault()
          SetCon(true)
        }} href=""> inscription</a>
         <a onClick={(e)=>{
         // alert(e)
          e.preventDefault()
          SetCon(false)
        }} href=""> connexion</a>
       {con?
    (<User/>):(<Login/>)
    } */}

    {/* <User/> */}
    {/* <Login/> */}
    {/* <Update/> */}
    <Camera/>
    </>
  )
}

export default App
