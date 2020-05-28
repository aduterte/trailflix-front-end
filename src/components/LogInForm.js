import React, {Component} from 'react'
import FormError from "./FormError"

class Form extends Component  {
    

    state = {
        userEmail: "",
        userPassword: "",
        name: "",
        newUser: false,
        passConfirm: "",
        errors: []

    }

    handleOnChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleLogin = (e) => {
        e.preventDefault()
        
        //fetch post log in
        //then callbck function we pass from app to "log in" and set logged in user state in app
        const user = {
            email: this.state.userEmail,
            password: this.state.userPassword
        }
        e.target.reset()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json", "Accept" : "application/json"},
            body: JSON.stringify(user)
        }).then(resp => resp.json())
        .then(data =>{
            if(!data.user){
                alert("Username or Password are incorrect")
            } else {
                localStorage.setItem("token", data.token)
                this.props.handleLogin(data.user)
            }
        })
        // .then(data => this.props.handleLogin(data))
    }

    handleSingup = (e) => {
        
        e.preventDefault()
        //fetch post log in
        //then callback function we pass from app to "log in" and set logged in user state in app
        const user = {
            name: this.state.name,
            email: this.state.userEmail,
            password: this.state.userPassword,
            password_confirmation: this.state.passConfirm
        }
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(resp => resp.json())
        .then(data => {
            // data.id == null ? 
            // this.setState({errors: data}):
            // this.props.handleLogin(data)
            if(!data.user){
                this.setState({errors: data})
            } else {
                localStorage.setItem("token", data.token)
                this.props.handleLogin(data.user)
            }
        })
    }

    newUser = () => {
        this.setState({newUser: !this.state.newUser})
    }

    render(){
       
        
        return(
            <div className="form-div">

                <h1>Sign In</h1>
                <form onSubmit={!this.state.newUser ? this.handleLogin : this.handleSingup}>
                    
                    {this.state.newUser &&  
                    <div className="input-box">
                        <input className="form-input" name="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleOnChange} />
                    </div>}
                    
                    <div className="input-box">
                        <input className="form-input" name="userEmail" value={this.state.userEmail} placeholder="Enter Email" onChange={this.handleOnChange}/>
                    </div>
                    
                    <div className="input-box">
                        <input className="form-input" name="userPassword" value={this.state.userPassword} type="password" placeholder="Enter Password" onChange={this.handleOnChange}/>
                    </div>

                    {this.state.newUser &&  
                    <div className="input-box">
                    <input className="form-input"  name="passConfirm" placeholder="Confirm Password" type="password" value={this.state.passConfirm} onChange={this.handleOnChange}/> 
                    </div>}
                    <div>
                    <button className="sign-button">{this.state.newUser ? "Sign Up" : "Log In"}</button>
                    </div>
                    <br/>
                   
                </form> 
                {this.state.newUser ? 
                    <div>Already a member? click <button onClick={this.newUser}>HERE</button> to Log in</div>:
                    <div>Not a user? click <button onClick={this.newUser}>HERE</button> to Sign up</div>
                    }
                    <br/>
                    {this.state.errors.map(error => <FormError key={error} error={error}/>)}
            </div>  
        )
    }
}

export default Form
