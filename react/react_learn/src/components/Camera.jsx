import React from "react";
import { useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 440,
    height: 440,
    facingMode: "user"
};

const Camera=()=>{
    const webcamRef=React.useRef()
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc); // Affiche l'image capturée dans la console
    }, [webcamRef]);

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