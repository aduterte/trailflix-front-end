import React from "react"
import LogInForm from "../components/LogInForm"

export default class LoginContainer extends React.Component {


    render (){
    return (
        <div id="login-container">
            <div id="login-div">
                <LogInForm handleLogin={this.props.handleLogin}/>
            </div>
        </div>
    )
    }
}