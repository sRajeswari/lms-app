import React from 'react';
import { withRouter } from 'react-router-dom';
import { setUserSession } from './Common';

import { FormErrors } from './FormErrors';
import axios from 'axios';
import { setUserAuthenticationStatus } from './Common';
import ModalComponent from './common/ModalComponent.js';
import { getUserAuthenticationStatus } from "./Common.js";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: '',
            password: '',
            UserType: 'student',
            RegisterUserType: 'student',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
            modalshow: false,
            modaltitle: '',
             modalbody: ''
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });

        //    () => { this.validateField(name, value) });
    }

    onValueChange = (e) => {
        this.setState({
            UserType: e.target.value
        })
    }

    validateField() {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        
        emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        passwordValid = this.state.password.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
 
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid },() => { console.log(this.state.formValid) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleClick = (e) => {
        this.props.history.push('/registration');
        e.preventDefault();
    }
    handleSubmit = (e) => {
        var apiBaseUrl = "http://localhost:8000/api/authentication/";
        var self = this;
        var payload = {
            "email": this.state.email,
            "password": this.state.password,
            "role": this.state.UserType
        }

        axios.get(apiBaseUrl + 'login/', payload)
            .then(function (response) {

                self.setState({ users: response.data });
                setUserSession(response.data[0].id, response.data[0].name, this.state.password, null,payload.role,
                    response.data[0].city, response.data[0].email, response.data[0].phone);
                
                if (response.status === 200) {
                    console.log("Login successfull");
                    console.log(this.state.users);
                    if (payload.role === "student") {
                        self.props.history.push('/dashboardS');
                    }
                    else
                        if (payload.role === "faculty") {
                            self.props.history.push('/dashboardF');
                        }


                }
                else if (response.data.code === 204)
                {
                    console.log("emailid and pwd  do not match");
                    //alert("emailid and pwd  do not match")
                }
                else
                {
                    console.log("User does not exists");
                    //alert("User does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        this.validateField();
        e.preventDefault();
        e.stopPropagation();

        if (this.state.formValid == true)
        {
            setUserAuthenticationStatus(true);
            //setUserSession(12, "Rajeswari Subramanian", payload.role, "Chennai",
           //     payload.email, "1234567890");
           
            this.setState({
                modalshow: true,
                modaltitle: 'Login',
                modalbody: 'Login Successful !!!',

            });

          //  alert("modal open");

           

        }
        
    }
   
    handleConfirmModalClose = (fromModal) => {
        //alert(fromModal.msg);

        this.setState({
            modalshow: false
        });
       // alert("modal close");
        if (this.state.UserType == 'student')
            this.props.history.push('/dashboardS');
        else
            this.props.history.push('/dashboardF');
    };

    render() {
        return (
            <div className="container">
                <div className="login-menu">
                    <form className="demoForm" onSubmit={this.handleSubmit}>
                        <div >

                           
                            <input type="radio" value="faculty" checked={this.state.UserType === "faculty"}
                                onChange={this.onValueChange} />
                            <label htmlFor="Faculty">Faculty</label>

                            <input type="radio" value="student"
                                checked={this.state.UserType === "student"}
                                onChange={this.onValueChange} />
                            <label htmlFor="Student">Student</label>
                         </div>


                        <div >
                            <input type="email" required name="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleUserInput} />
                        </div>

                        <div >
                            <input type="password" name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleUserInput} />
                        </div>

                       
                        <input type='submit' value='Login'  />
                       
                        {!this.state.formValid  ?
                            <div className='error-message' >
                            <FormErrors formErrors={this.state.formErrors} />
                            </div> : 
                            <ModalComponent
                                show={this.state.modalshow}
                                title={this.state.modaltitle}
                                body={this.state.modalbody}
                                onClick={this.handleConfirmModalClose}
                                onHide={this.handleConfirmModalClose} />
                        }
                            
                    </form>
                </div>

                <div className="register-menu">
                    <form className="demoForm" onSubmit={this.handleClick}>
                        <label htmlFor="Registration">New User? Register Now</label>
                        <br />
                        <input type='submit' value='Register' />
                    </form>
                </div>


            </div>
        )
    }

}
export default withRouter(Login);
