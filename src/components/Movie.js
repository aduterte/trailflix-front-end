import React, {useState} from "react"
import {Link} from "react-router-dom"

export default function Movie(props){

    const poster = `https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`,
        [isBig, setIsBig] = useState(false),
    style = {width: '600px'}

    return(
        <div className="col" onMouseOver={()=>setIsBig(true)} onMouseOut={()=> setIsBig(false)} style={{backgroundImage: `url(${poster})`}}>
            {/* {isBig ? 
            <img src={poster} width="220" alt={props.movie.title} onClick={() => props.action(props.movie)}/>: 
            <img src={poster} alt={props.movie.title} onClick={() => props.action(props.movie)}/>} */}
            {/* <div style={{width: "200px", height:"300px"}} onClick={() => props.action(props.movie)}></div> */}
            {props.movie.title}
            {props.title !== "profile" ?
    <Link to={`/movies/${props.movie.id}`}><div style={{width: "200px", height:"300px"}}></div></Link>:
    <Link to={`/movies/${props.movie.id}`}><div style={{width: "200px", height:"250px"}}></div></Link>}
            <br/>
            {props.title === "profile" ? 
            <button onClick={() => props.removeFavorite(props.movie)} >remove</button> :
            null
            }
        </div>
    )
}