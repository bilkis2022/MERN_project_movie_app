import React, { useRef, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import './register.scss'
import axios from 'axios'

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const emailref = useRef();
  const usernameref = useRef();
  const passwordref = useRef();
  
  const handleStart = () => {
    setEmail(emailref.current.value)
  }

  const handlefinish = async (e) => {
    e.preventDefault();
    setUsername(usernameref.current.value);
    setPassword(passwordref.current.value);

    try {
      await axios.post('auth/register', {email, username, password});
      history('/login')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='register'>
      <div className='top'>
        <div className='wrapper'>
          <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt='' />
          <button className='loginButton'>Sign In</button>
        </div>
      </div>

      <div className='container'>
        <h1>Unlimited movies, Tv shows and more.</h1>
        <h2>Watch anywhere, Cancel anytime</h2>
        <p>Ready to watch? Enter your email to create or restart your membership. </p>

        {
          !email ? (
            <div className='input'>
              <input type='email' placeholder='email address' ref={emailref}></input>
              <button className='registerButton' onClick={handleStart}>Get Started</button>
            </div>
          ) : (
            <div className='input'>
              <input type='username' placeholder='username' ref={usernameref}></input>
              <input type='password' placeholder='password' ref={passwordref}></input>
              <button className='registerButton' onClick={handlefinish}>Start</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Register