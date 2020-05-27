import React from "react"
import LogInForm from "../components/LogInForm"


export default class LoginContainer extends React.Component {


    render (){
    return (
        <div id="login-container">
            <div id="login-container-black">
            <div id="login-div">
            
            <img src="http://localhost:3001/images/biglogo.svg"/>
                <LogInForm handleLogin={this.props.handleLogin}/>
            </div>
            </div>
        </div>
    )
    }
}