import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useEffect

} from 'react';
const UpdateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tasks/${id}`);
                setName(response.data.name);
                setDescription(response.data.description);
                setCompleted(response.data.completed);
                setDate(response.data.date);
                setTime(response.data.time);

            } catch (error) {
                console.error('Error fetching task data', error);
            }
        };
        fetchTask();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/tasks/${id}`, {
                name: name,
                description: description,
                completed: completed ? 1 : 0,
                date: date,
                time: time
            });
            setSuccessMessage('Task was updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/tasktable');
            }, 1000);
        } catch (error) {
            console.error('There was an error updating the task!', error);
        }
    };

    return (
        <div>
            <h2 className='add-task-title'>Update Task</h2>
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
                <Button variant="success" type='submit' className='text-end'>Update Task</Button>{' '}
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

export default UpdateTask;
