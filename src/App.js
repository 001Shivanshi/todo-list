import Form from './components/Form'
import Todolist from './components/Todolist';
import React, { useState } from 'react'


import './App.css'


export default function App() {
    const [todos,setTodos]=useState([]);
  return (
    <div className='App'>
      <div className='header'>
        <h1>Todolist-App</h1>
        <div><Form todos={todos} setTodos={setTodos} /></div>
        <div><Todolist todos={todos} setTodos={setTodos}/></div>
        
       
      </div>
    </div>
  )
}
