import React, {Component} from 'react'
import Movie from "./Movie"
import { withRouter } from 'react-router-dom'
class Profile extends Component {

    tempfunc = () => {
        //make this go to /movie/id
        console.log("future function")
    }
    render(){
        const {name, movies} = this.props.user
        return (
            <div id="movie-container">
        <div style={{color: "white"}}><h1>Username: {name}</h1>
            </div>
            <div className="flex-grid"> 
            {this.props.favorites.map(movie => <Movie title="profile" key={movie.id} movie={movie} action={this.tempfunc} removeFavorite={this.props.removeFavorite}/>)}
        </div>
        
        </div>
        )
    }
}
export default Profile