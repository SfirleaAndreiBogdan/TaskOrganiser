import React from 'react';
import './App.css';
import AddTask from './pages/AddTask';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import TaskTable from './pages/TaskTable';
import UpdateTask from './pages/UpdateTask';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <BrowserRouter>

                <Routes>
                    <Route path='/add'element={<AddTask />} />
                    <Route path='/tasktable' element={<TaskTable/>}/>
                    <Route path="/update/:id" element={<UpdateTask />} />
                    <Route index element={<Home/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;
