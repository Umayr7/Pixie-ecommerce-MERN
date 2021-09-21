import React, { useState, useContext, useEffect } from 'react'

import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/user/userContext';

export const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const userContext = useContext(UserContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = userContext;


    useEffect(() => {
        if(isAuthenticated) {
            console.log('whaat');
            props.history.push('/');
        }
        if(error === 'User already exists!') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-desable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        cpassword: '',
    });

    const {fname, lname, username, email, password, cpassword} = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(fname === '' || lname === '' || username === '' || email === '' || password === '') {
            setAlert('Please Enter all fields', 'danger');
        } else if(password !== cpassword) {
            setAlert('Password do not match', 'danger');
        } else {
            register({
                fname,
                lname,
                username,
                email,
                password
            });
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-heading">
                        <h1 className="col-md-8 offset-md-2">
                            Account <span className="text-primary">Register</span>
                        </h1>
                        <div className="col-md-8 offset-md-2">
                            <br />
                            <form onSubmit={onSubmit}>
                                <div className="row ">
                                    <div className="form-group col-md-5">
                                        <label for="exampleInputEmail1">First Name</label>
                                        <input type="text" name="fname" value={fname} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="First Name" required />
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label for="exampleInputEmail1">Last Name</label>
                                        <input type="text" name="lname" value={lname} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Name Name" required />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group col-md-5">
                                        <label for="exampleInputEmail1">Username</label>
                                        <input type="text" name="username" value={username} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Username" required />
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" name="email" value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-5">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" name="password" value={password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange} required minLength="6" />
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label for="exampleInputPassword1">Confirm Password</label>
                                        <input type="password" name="cpassword" value={cpassword} className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" onChange={onChange} required minLength="6" />
                                    </div>

                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
