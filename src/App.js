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

class App extends React.Component {

  state = {
    movies: [],
    loggedIn: false,
    user: null,
    randomMovie: {}
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
    this.setState({user: user})
    console.log(this.state.user)
  }

  render(){
    
    return (
      <Router>
      <div className="App">
        <Nav />
        <Switch>
          
          <Route path="/movies">
          {this.state.movies.length > 0 ? <MovieContainer movies={this.state.movies} rndMov={this.state.randomMovie}/> : null}
          </Route>
          {/* <Route exact path="/" render={() => (
            this.state.user ? <Redirect to="/movies"/> : <Redirect to="/login" />
          ) } /> */}
          <Route exact path="/">
            {this.state.user ? <Redirect to="/movies"/> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" render={() => (
            this.state.user ? <Redirect to="/movies"/> : <LoginContainer handleLogin={this.handleLogin}/>  
            ) } />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
