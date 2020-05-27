import React, {Component} from "react"
import Movie from "../components/Movie"
import {Redirect} from "react-router-dom"

export default class SearchContainer extends Component {
    constructor () {
        super()
        this.state = {
            searchTerm: "",
            results: []
        }
    }


    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }
    
    filterMovies = () => {
        //.map(movie => <div>{movie.title}</div>)
        const filtered = this.state.results.filter(mov => mov.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        return filtered
        
    }

    handleSubmit = (e) => {
        e.preventDefault()        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=b94d0b3b408ccf74d9f49bb39a64a13b&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(data => {
            // this.setState({
            //     results: data.results
            // })
            // this.dbConvertor(data.results)
            this.props.dbConvertor(data.results, "search")
        })
    }

    componentDidMount() {
        
        this.setState({
            results: this.props.ourDb
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.ourDb.length !== this.props.ourDb.length){
            this.setState({results: this.props.ourDb})
        }
    }
    handleMovieClick = (movie) => {
        document.getElementById("movie-container").scrollTop = 0
        return <Redirect to={`/movies/${movie.id}`}/>  
    }

    render(){
        
        return (
            <div id="search-container">
                
                <div className="search-header">
                    <form onSubmit={this.handleSubmit}>
                    <img className="search-icon" src="https://svg-clipart.com/svg/icon/nQy8yy4-search-icon-white-one-vector.svg"/>
                    <input className="search-bar" placeholder="Search..." type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange}/>
                    </form>
                </div>
                <div className="search-results">
                    <div  className="flex-grid">
                        {this.filterMovies().map(movie => 
                        <Movie 
                        title="movie-container" 
                        key={movie.id} 
                        movie={movie} 
                        removeFavorite={this.props.removeFavorite} 
                        action={this.handleMovieClick}
                        favs={this.props.userFavorites}/>)}
                    {/* (movie => <Movie title="movie-container" key={movie.id} movie={movie} removeFavorite={props.removeFavorite} action={handleMovieClick}/>) */}

                    </div>
                </div>
            </div>
        )
    }
}