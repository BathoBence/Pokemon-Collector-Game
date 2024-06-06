import React, { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';

const WelcomePage = () => {
    const {page, setPage} = useState('home');

    useEffect(()=>{

    },[])

    return (<div className='page_container'>
        <div className='welcome_container'>
            <Link to={`/register`}><button className='wecome_button'>Sign up</button></Link>
            <Link to={`/login`}><button className='wecome_button'>Login</button></Link>
        </div>
        </div>)
}

export default WelcomePage