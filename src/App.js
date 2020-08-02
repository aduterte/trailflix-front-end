import React from 'react'
import Nav from "./components/Nav"
import MovieContainer from "./containers/MovieContainer"
import LoginContainer from "./containers/LoginContainer"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Profile from './components/Profile'
import ShowMovieContainer from './containers/ShowMovieContainer';
import SearchContainer from './containers/SearchContainer';
import "../node_modules/video-react/dist/video-react.css"

// api key: b94d0b3b408ccf74d9f49bb39a64a13b 

class App extends React.Component {

  state = {
    movies: [],
    loggedIn: false,
    user: null,
    randomMovie: {},
    userFavorites: [],
    similarMovies: [],
  }

  componentDidMount(){
    fetch('https://young-meadow-44827.herokuapp.com/movies')
    .then(resp => resp.json())
    .then(data => {
      const random = [Math.floor(Math.random() * data.length)],
            randomMovie = data[random]
      this.setState({randomMovie: randomMovie})
      this.setState({movies: data})
    })

    if(localStorage.getItem("token")){
      fetch("https://young-meadow-44827.herokuapp.com/login", {
        headers: {
          "Authenticate": localStorage.token
        }
      })
      .then(res => res.json())
    .then(user=> {
        
        this.handleLogin(user)
        //if error, don't update the state
      })
    }else{
      console.log("No token found, user is not authenticated")
    }
    
    
  }

  handleLogin = (user) => {
    
    this.setState({
      user: user
      
    })

    if(user.movies){
      this.setState({userFavorites: user.movies})
    }
  }

  handleLogout = (user) => {
    this.setState({
      user: null
    })
    localStorage.removeItem("token")
  }

  addFavorite = (movie) => {

    const obj = {
      movie_id: movie.id,
      user_id: this.state.user.id
    }
    
    fetch("https://young-meadow-44827.herokuapp.com/favorites", {
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(movie => {
      this.setState({
        userFavorites: [...this.state.userFavorites, movie]
      })
    } )
    
  }

  handleFavorite = (movie) => {
    if (this.state.userFavorites.find(mov => mov.title === movie.title)){
        this.removeFavorite(movie)
    } else {
        this.addFavorite(movie)
    }
    //if is in userfavore use removeFavorite helper
    //else if is NOT in userFav use add Favorite helper
    // .filter(mov => mov.title === movie.title).length > 0
  }
  
  removeFavorite = (movie) => {
    const obj = {
      movie_id: movie.id,
      user_id: this.state.user.id
    }
    fetch(`https://young-meadow-44827.herokuapp.com/favorites`, {
      method: "DELETE",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(data => {
      const newArr = this.state.userFavorites.filter(mov => mov.title !== movie.title)
      this.setState({userFavorites: newArr})
    })
  }

  dbConvertor = (results, comp) => {
    this.setState({similarMovies: []})    
    results.forEach(movie =>  {
          
            if(this.state.movies.filter(e => +e.tmdb_id  === movie.id).length > 0){
               if(comp === "show"){
                 let similar = this.state.movies.find(e => +e.tmdb_id  === movie.id)
                 this.setState({similarMovies: [...this.state.similarMovies, similar]})
               }
            } else {
                
                fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=b94d0b3b408ccf74d9f49bb39a64a13b&language=en-US`)
                .then(resp => resp.json())
                .then(movie => this.createMovie(movie, comp))
               
            }  
    })
}

createMovie = (movie, comp) => {
  
      if(!movie.poster_path || !movie.backdrop_path || !movie.release_date){

      } else {     
        const genres = movie.genres.map(genre => genre.name)
  
        const obj = {
              title: movie.title,
              genres: genres,
              backdrop_path: movie.backdrop_path,
              adult: movie.adult,
              imdb_id: movie.imdb_id,
              overview: movie.overview,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              runtime: movie.runtime,
              tagline: movie.tagline,
              original_language: movie.original_language,
              tmdb_id: movie.id
          }
         
      fetch("https://young-meadow-44827.herokuapp.com/movies", {
          method: "POST",
          headers : {'Content-Type': 'application/json'},
          body: JSON.stringify(obj)
      }).then(resp => resp.json())
      .then(movie => {
        this.setState({movies: [...this.state.movies, movie]})
        comp === "show" && this.setState({similarMovies: [...this.state.similarMovies, movie]})
      })
      }
}

  render(){
    
    return (
      <Router>
      <div className="App">
        <Nav user={this.state.user} handleLogout={this.handleLogout}/>
        <Switch>
          
          <Route exact path="/movies">
          {this.state.user ? <MovieContainer userFavorites={this.state.userFavorites} action={this.handleFavorite} movies={this.state.movies} rndMov={this.state.randomMovie} /> : <Redirect to="/login" />}
          </Route>
          {/* <Route exact path="/" render={() => (
            this.state.user ? <Redirect to="/movies"/> : <Redirect to="/login" />
          ) } /> */}
          <Route exact path="/">
            {this.state.user ? <Redirect to="/movies"/> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" render={() => (
            this.state.user ? <Redirect to="/profile"/> : <LoginContainer handleLogin={this.handleLogin}/>  
            ) } />
          <Route path='/profile'>
            {this.state.user ? <Profile user={this.state.user} favorites={this.state.userFavorites} action={this.handleFavorite}/> : <Redirect to="/login" /> }
          </Route>
          <Route exact path="/movies/:id" render={
            (routerProps) => {
              let id = routerProps.match.params.id
              let movie = this.state.movies.find(movie => +movie.id === +id)
              return this.state.user ? 
              <ShowMovieContainer 
              userFavorites={this.state.userFavorites} 
              action={this.handleFavorite} 
              movies={this.state.movies} 
              movie={movie}
              dbConvertor={this.dbConvertor}
              similarMovies={this.state.similarMovies}/> :
              <Redirect to="/login" />
            }
          }
          />
           <Route path='/search'>
            <SearchContainer ourDb={this.state.movies} dbConvertor={this.dbConvertor} action={this.handleFavorite} userFavorites={this.state.userFavorites}/> 
           </Route>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
