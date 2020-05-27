import React, {useState} from "react"

export default function TrailerButton (props){

    const [trailButton, setTrailButton] = useState(false)


    return (
        <div>
            <div className={trailButton ? "trailer-button-hover" : "trailer-button"} 
            onMouseEnter={()=>setTrailButton(true)} 
            onMouseLeave={()=>setTrailButton(false)}
            onClick={()=>props.func(props.ytKey)}>
                Trailer {props.num}
                </div>  
                </div>
        
    )


}