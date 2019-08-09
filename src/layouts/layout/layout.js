import React, {Component} from 'react';

import Login from '../../components/login/login';
import {Redirect} from 'react-router-dom';


class Layout extends Component {
    state = {
        user: {
            'email':'',
            'password':''
        },
        passwordType: "password"
    }

    changeUserHandler = (event) => {

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]:event.target.value
            }
        })
    }

    changePasswordTypeHandler = () => {
        let passwordType = (this.state.passwordType === 'password') ? 'text' : 'password';
        this.setState({
            ...this.state,
            passwordType: passwordType
        });
    }

    login = () => {
        this.props.login(this.state.user.email, this.state.user.password);
    }

    render() {
        

        let page = this.props.isLogged ? <Redirect to="/main" /> :

        (
            <div className="main">

                <Login 
                    login={this.login} 
                    changePasswordType={this.changePasswordTypeHandler}
                    passwordType={this.state.passwordType} 
                    changeInputHandler={this.changeUserHandler} 
                    user={this.state.user}
                    
                    error={this.props.error}

                    />
                
            </div>
)

        return page;
    }

}


export default Layout;