import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/tasks/add', {
                name: name,
                description: description,
                completed: completed ? 1 : 0,
                date: date,
                time: time
            });
            
            setName('');
            setDescription('');
            setCompleted(false);
            setSuccessMessage('Task was added successfully!');
            setErrorMessage('');
            setDate('');
            setTime('');
            
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

        } catch (error) {
            console.error('There was an error adding the task!', error);
            setSuccessMessage('');
            setErrorMessage('There was an error adding the task.');
        }
    };

    return (
        <div>
            <h2 className='add-task-title'>Add New Task</h2>
            <form onSubmit={handleSubmit}>
               <div className='inputBox mb-5'>
                    <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span>Enter your task here</span>
               </div>
               
               <div className='inputBox mb-5'>
                    <input 
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <span>Description</span>
               </div>

               <div className='inputBox mb-5'>
                    <input 
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
               </div>

               <div className='inputBox mb-5'>
                    <input 
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
               </div>
               <Button variant="light" className='me-5' onClick={() => {navigate('/tasktable')}}>Go back</Button>{' '}
                <Button variant="success" type='submit' className='text-end'>Add Task</Button>{' '}
            </form>

            {successMessage && (
                <Alert variant='success' className="mt-3">
                    {successMessage}
                </Alert>
            )}

            {errorMessage && (
                <Alert variant='danger' className="mt-3">
                    {errorMessage}
                </Alert>
            )}
        </div>
    );
};

export default AddTask;
