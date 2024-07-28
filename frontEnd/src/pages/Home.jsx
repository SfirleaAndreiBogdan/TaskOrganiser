import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img src="/logoFinal.png" alt="Logo" className="home-logo" />
            <h1 className="home-title">Welcome to the Task Manager</h1>
            <p className="home-description">
                Manage your tasks efficiently and stay organized!
            </p>
            <Button variant="success" onClick={() => navigate('/tasktable')} className='mt-5'>
                Go to your task table
            </Button>
        </div>
    );
};

export default Home;
