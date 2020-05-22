import React from 'react'
import Nav from "./components/Nav"
import MovieContainer from "./containers/MovieContainer"
import LoginContainer from "./containers/LoginContainer"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

class App extends React.Component {

  state = {
    movies: [],
    loggedIn: false,
    user: null
  }
  componentDidMount(){
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(data => this.setState({movies: data}))
    
  }

  handleLogin = (user) => {
    // console.log(user)
    this.setState({user: user})
  }

  render(){
    // if(this.state.user !== null){
    //   console.log(this.state.user)
      
    // }
    return (
      <Router>
      <div className="App">
        <Nav />
        <Switch>
          
          <Route path="/movies">
            <MovieContainer movies={this.state.movies}/>
          </Route>
          <Route path="/">
            {!this.state.user ? 
            <LoginContainer handleLogin={this.handleLogin} />:
            <MovieContainer movies={this.state.movies}/>
            }
          </Route>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
