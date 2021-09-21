import React, { useState, useContext, useEffect } from 'react'

import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/user/userContext';

export const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const userContext = useContext(UserContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = userContext;


    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        } else {
            console.log('login first')
        }
        if(error === 'Invalid Credeintials') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-desable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(email === '' || password === '') {
            setAlert('Please Enter all fields', 'danger');
        } else {
            login(user);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-heading">
                        <h1 className="col-md-8 offset-md-2">
                            Account <span className="text-primary">Login</span>
                        </h1>
                        <div className="col-md-8 offset-md-2">
                        <br />
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" required />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" name="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange} required minLength="6" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
