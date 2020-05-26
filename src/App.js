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
// api key: b94d0b3b408ccf74d9f49bb39a64a13b 

class App extends React.Component {

  state = {
    movies: [],
    loggedIn: false,
    user: null,
    randomMovie: {},
    userFavorites: []
  }
  componentDidMount(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(data => {
      const random = [Math.floor(Math.random() * data.length)],
            randomMovie = data[random]
      this.setState({randomMovie: randomMovie})
      this.setState({movies: data})
    })
    
    
  }

  handleLogin = (user) => {
    console.log(user)
    this.setState({
      user: user,
      userFavorites: user.movies
    })
  }

  func = () => {
    console.log("Movie in Profile has been clicked")
  }

  addFavorite = (movie) => {

    const obj = {
      movie_id: movie.id,
      user_id: this.state.user.id
    }
    
    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(movie => {
      this.setState({
        userFavorites: [...this.state.userFavorites, movie]
      })
    } )
    // if movie doesn't exist in user.favorite, do fetch post. else do fetch delete
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
    fetch(`http://localhost:3000/favorites`, {
      method: "DELETE",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(data => {
      const newArr = this.state.userFavorites.filter(mov => mov.title !== movie.title)
      this.setState({userFavorites: newArr})
    })
  }


  render(){
    
    return (
      <Router>
      <div className="App">
        <Nav user={this.state.user}/>
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
            {this.state.user ? <Profile user={this.state.user} favorites={this.state.userFavorites} removeFavorite={this.removeFavorite}/> : <Redirect to="/login" /> }
          </Route>
          <Route exact path="/movies/:id" render={
            (routerProps) => {
              let id = routerProps.match.params.id
              let movie = this.state.movies.find(movie => movie.id == id)
              return this.state.user ? <ShowMovieContainer userFavorites={this.state.userFavorites} action={this.handleFavorite} movies={this.state.movies} movie={movie}/> :
              <Redirect to="/login" />
            }
          }
          />
           <Route path='/search'>
            <SearchContainer ourDb={this.state.movies}/> 
           </Route>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
