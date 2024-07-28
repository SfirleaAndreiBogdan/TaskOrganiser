import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation, useNavigate } from 'react-router-dom';
import { FaEdit,FaCheck,FaTrash } from 'react-icons/fa';
import { tableCustomStyles } from '../tableStyle';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [statusMessage, setStatusMessage] = useState('');
    
    const messages = [
        <div className='par'>
            <p>“Learn as if you will live forever, live like you will die tomorrow.”</p>
            <p className='quote-author'>-Mahatma Gandi-</p>
        </div>,
        <div className='par'>
            <p>“When you change your thoughts, remember to also change your world.”</p>
            <p className='quote-author'>- Norman Vincent Peale -</p>
        </div>,
        <div className='par'>
            <p>“Success usually comes to those who are too busy to be looking for it.”.</p>
            <p>- Henry David Thoreau -</p>
        </div>,
        <div className='par'>
            <p>“There are three ways to ultimate success: The first way is to be kind. The second way is to be kind. The third way is to be kind.” </p>
            <p className='quote-author'>- Mister Rogers -</p>
        </div>,
        <div className='par'>
            <p>“Success is getting what you want; happiness is wanting what you get.”</p>
            <p className='quote-author'>- W. P. Kinsella -</p>
        </div>,
        <div className='par'>
        <p>“Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.”</p>
        <p className='quote-author'>- John Wooden -</p>
        </div>
    ];


    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.completed ? 'Completed' : 'In Progress',
            sortable: true,
            cell: row => (
                <span style={{ color: row.completed ? 'green' : '#FFB800' }}>
                    {row.completed ? 'Completed' : 'In Progress'}
                </span>
            )
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            wrap: true
        },
        {
            name: 'Task',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true
        },
        {
            name: 'Time',
            selector: row => row.time,
            sortable: true
        },
        {
            name: 'Action',
            cell: row => (
                <div className="action-buttons">
                    <Button
                        variant="warning"
                        onClick={() => handleEdit(row.id)}
                        className='me-2'
                    >
                        <FaEdit />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(row.id)}
                        className='me-2 '
                    >
                        <FaTrash />
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleComplete(row.id)}
                    >
                        <FaCheck />
                    </Button>
                </div>
            )
        }
        
    ];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/tasks');
                console.log('Fetched tasks:', response.data);
                setTasks(response.data);
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };

        fetchTasks();
    }, [location]);

    const [records, setRecords] = useState(tasks);

    const handleFilter = (event) => {
        const newData = tasks.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    const handleDelete = (id) => {
         axios.delete(`http://localhost:8080/tasks/${id}`)
        const updatedRecords = records.filter(task => task.id !== id);
        setRecords(updatedRecords);
        setTasks(updatedRecords);
        
    }

    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    }
    const handleComplete = async (id) => {
            const response = await axios.patch(`http://localhost:8080/tasks/${id}/status?status=true`);
            const updatedRecords = records.map(task => 
                task.id === id ? { ...task, completed: true } : task
            );
            setRecords(updatedRecords);

            const randomIndex = Math.floor(Math.random() * messages.length);
            setStatusMessage(messages[randomIndex]);
            setTimeout(() => {
                setStatusMessage('');
            }, 10000);
        }


    return (
        <div className='container mt-5'>
            <h1 className='header'>Task List</h1>
            {statusMessage && <div className="alert alert-success mt-3">{statusMessage}</div>}
            <div className='text-end mb-2'> 
            <Button variant="success" className='btnLeft' onClick={() => navigate('/add')}>Add Task</Button>{' '}
            <input className='searchinp' type="text" onChange={handleFilter} placeholder='Search your task'/>
            </div>
            <DataTable
                columns={columns}
                data={records}
                pagination
                highlightOnHover
                striped
                fixedHeader
                customStyles={tableCustomStyles}
            />
        </div>
    );
};

export default TaskTable;
