import React, { useState } from "react";
import { useCallback } from "react";
import Webcam from "react-webcam";
import { useContext } from "react";
import Api from "../contexts/request"




const videoConstraints = {
    width: 440,
    height: 440,
    facingMode: "user"
};

const Camera=()=>{
    const{SOURCE}=useContext(Api)
    const [imageSrc,SetimageSrc]=useState(null)

    const webcamRef=React.useRef()
    const capture = useCallback(async() => {
        const image = webcamRef.current.getScreenshot();

        SetimageSrc(image)

        // const response=await fetch(`${SOURCE}/capture`, {

        //     method:"POST",
   
        //     headers:{"Content-Type":"application/json"},
   
        //     body:JSON.stringify({image:imageSrc})
        //  });
        // const data= await response.json()
        // console.log('reponse:',data)
        
    }, [webcamRef]);
    console.log(imageSrc)

    return(<>
    <Webcam
   
   audio={false}
   height={720}
   ref={webcamRef}
   screenshotFormat="image/jpeg"
   width={1280}
   videoConstraints={videoConstraints}
    
    />
    <button onClick={capture}>capturer une photo</button>
    </>)
}

export default Camera