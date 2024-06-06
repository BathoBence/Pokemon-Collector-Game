import React from "react";
import "./RegistrationForm.css"

const RegistrationForm = ({
    onRegister, errorMessage, username, setUsername, email, setEmail,
    password, setPassword, confirmPassword, setConfirmPassword }) => {


    return (<div className='register'>
        <h2>Registration</h2>
        <form onSubmit={onRegister}>
            <div className="formField">
                <label htmlFor="username" className="fromLabel">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="formField">
                <label htmlFor="email" className="fromLabel">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="formField">
                <label htmlFor="password"  className="fromLabel">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="formField">
                <label htmlFor="confirmPassword" className="fromLabel">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="formField" style={{ color: 'red' }}>{errorMessage}</div>
            <button type="submit">Register</button>
        </form>
    </div>
    )
}

export default RegistrationForm;