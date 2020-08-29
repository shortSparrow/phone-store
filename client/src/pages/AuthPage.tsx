import React, { useState, SyntheticEvent, useContext } from 'react';
import { AuthContext } from '../context/authContext';

interface dataInterface {
    userId: null,
    token: null,
}

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const auth = useContext(AuthContext)

    const logIn = (event:SyntheticEvent) => {
        event.preventDefault();

        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then((data:dataInterface) => {
                auth.login!(data.token, data.userId)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const signIn = (event:SyntheticEvent) => {
        event.preventDefault();

        fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    return (
        <div>
            <h1>Auth Page!</h1>
            <form>
                <div className="field-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="field"
                        value={form['email']}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="field"
                        value={form['password']}
                        onChange={(e) => handleChange('password', e.target.value)}
                    />
                </div>

                <button onClick={logIn}>LogIn</button>
                <button onClick={signIn}>SignIn</button>
            </form>
        </div>
    );
};

export default AuthPage