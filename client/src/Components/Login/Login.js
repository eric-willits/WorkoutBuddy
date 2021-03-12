import React, { useState } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import "./Login.css";
import ButtonMain from '../UI/ButtonMain/ButtonMain';

function Login(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <div className="login__container">
            <h1 className="login__header">WORKOUT BUDDY</h1>
            <div className="login__content--container">
                <div className="login__input--container">
                    <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="login__buttons--container">
                    <ButtonMain onClick={() => props.register({username, password})}>REGISTER</ButtonMain>
                    <ButtonMain onClick={() => props.login({username, password})}>LOGIN</ButtonMain>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(actions.login(data)),
        register: data => dispatch(actions.register(data))
    }
}

export default connect(null, mapDispatchToProps)(Login);