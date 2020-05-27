import React, {Component} from 'react'
import Movie from "./Movie"
// import { withRouter } from 'react-router-dom'
class Profile extends Component {

    tempfunc = () => {
        //make this go to /movie/id
        console.log("future function")
    }
    render(){
        const {name} = this.props.user
        return (
            <div id="movie-container">
                <div style={{color: "white"}} className="movies-header"><h1>Welcome {name},</h1></div>
            <div style={{color: "white"}} className="movies-header"><h1>My Favorites</h1>
            </div>
            <div className="flex-grid"> 
            {this.props.favorites.map(movie => <Movie title="profile-container" favs={this.props.favorites} key={movie.id} movie={movie} handleFavorite={this.props.action}/>)}
        </div>
        
        </div>
        )
    }
}
export default Profile