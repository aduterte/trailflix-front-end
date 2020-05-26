import React, {Component} from "react"

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
            this.dbConvertor(data.results)
        })
    }
    
    createMovie = (movie) => {
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
                    console.log(obj)
                if(!obj.poster_path || !obj.backdrop_path || !obj.release_date){

                } else {     
                fetch("http://localhost:3000/movies", {
                    method: "POST",
                    headers : {'Content-Type': 'application/json'},
                    body: JSON.stringify(obj)
                }).then(resp => resp.json())
                .then(movie => this.setState({results: [...this.state.results, movie]}))
                }
    }
    
    componentDidMount() {
        
        this.setState({
            results: this.props.ourDb
        })
    }

    dbConvertor = (results) => {
        
        results.forEach(movie =>  {
                console.log(movie.id)
                if(this.props.ourDb.filter(e => +e.tmdb_id  === movie.id).length > 0){
                        // find movie in our db, add to results state
                        // let ourDbMovie = this.props.ourDb.filter(e => +e.tmdb_id  === movie.id)
                        // console.log(ourDbMovie[0])
                        // this.setState({results: [...this.state.results, ourDbMovie[0]]})
                    // console.log(this.state.results)
                } else {
                    
                    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=b94d0b3b408ccf74d9f49bb39a64a13b&language=en-US`)
                    .then(resp => resp.json())
                    .then(movie => this.createMovie(movie))
                   
                }
            

            
        })
    }

    



    render(){
        console.log(this.props.ourDb)
        console.log("filtered",this.state.results)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <input placeholder="Search..." type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange}/>
                </form>
                <div>
                    {this.filterMovies().map((x, i) => <div>{i}.{x.title}</div>)}
                {/* (movie => <Movie title="movie-container" key={movie.id} movie={movie} removeFavorite={props.removeFavorite} action={handleMovieClick}/>) */}

                </div>
            </div>
        )
    }
}