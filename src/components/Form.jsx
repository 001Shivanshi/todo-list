import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Button, Modal } from 'react-bootstrap';  

const Form = ({ todos, setTodos }) => {
    const [input, setInput] = useState('');
    const [todoCount, setTodoCount] = useState(1);
    const [showModal, setShowModal] = useState(false);  

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onChange = (e) => {
        setInput(e.target.value);
    };

    // Adding to the collection on Firebase DB
    const handleSubmit = async (e) => {
        // e.preventDefault();

        // if (input.trim() === "") {
        //     return;
        // }

        const newTodo = {
            name: `Todo ${todoCount}: ${input}`,
            completed: false,
            id: uuid(),
        };

        try {
            setTodos([...todos, newTodo]);
            setShowModal(false);
            await addDoc(collection(db, "todos"), newTodo);
            setTodos([...todos, newTodo]);
            setInput('');
            setTodoCount(todoCount + 1);
        } catch (error) {
            console.error("Error adding todo: ", error);
            setShowModal(false)
        }
        setShowModal(false)
 
    };

    return (
        <>
          
                <input
                    className='form-input'
                    type='text'
                    placeholder={`Add a task`}
                    autoComplete='off'
                    value={input}
                    onChange={onChange}
                />
                <Button variant="primary" className='form-button' type='button' disabled={input.length===0} onClick={()=>{handleShow()}}>
                    Add
                </Button>
        
            {/* Modal for confirmation */}
            {showModal && <Modal show={showModal} onHide={()=>{setShowModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title className='text'> Confirm task Addition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text'> Are you sure you want to add this task?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleClose()}}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{handleSubmit()}}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    );
};

export default Form;
