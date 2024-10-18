import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; 

const Todo = ({ todo, todos, setTodos }) => {
    const [edit, setEdit] = useState(false);
    const [inputEdit, setInputEdit] = useState(todo.name);
    const [showModal, setShowModal] = useState(false); 

    
    const onChangeSave = (e) => {
        setInputEdit(e.target.value);
    };
    const onEdit = () => {
        setEdit(true);
    };

    // Save the edited todo (update in Firestore)
    const onSave = async (todoId) => {
        setEdit(false);
        if (inputEdit) {
            try {
                const todoDocRef = doc(db, 'todos', todoId);
                await updateDoc(todoDocRef, {
                    name: inputEdit,
                });
                const updatedTodos = todos.map((item) =>
                    item.id === todoId ? { ...item, name: inputEdit } : item
                );
                setTodos(updatedTodos);
            } catch (error) {
                console.error('Error updating todo: ', error);
            }
        } else {
            
            setInputEdit(todo.name);
        }
    };

    // Delete the todo (from Firestore)
    const onDelete = async (todoId) => {
       try {
            const todoDocRef = doc(db, 'todos', todoId);
            await deleteDoc(todoDocRef);
            setTodos(todos.filter((item) => item.id !== todoId));
            setShowModal(false); 
        } catch (error) {
            console.error('Error deleting todo: ', error);
        }
    };

    // Toggle complete/incomplete status (update in Firestore)
    const onComplete = async (todoId, completed) => {
        try {
            const todoDocRef = doc(db, 'todos', todoId);
            await updateDoc(todoDocRef, {
                completed: !completed,
            });
            setTodos(
                todos.map((item) =>
                    item.id === todoId ? { ...item, completed: !completed } : item
                )
            );
        } catch (error) {
            console.error('Error updating todo status: ', error);
        }
    };
    const openModal = () => {
        setShowModal(true);
    };

    // Close the modal without deleting
    const closeModal = () => {
        setShowModal(false);
    };

    if (edit) {
        return (
            <div className="todo-li">
                <li className="li-list">
                    <input
                        className="li-input"
                        value={inputEdit}
                        onChange={onChangeSave}
                    />

                    <button className="button-save" onClick={() => onSave(todo.id)}>
                        <span className="text-save">Save</span>
                        <i className="fa fa-save"></i>
                    </button>
                </li>
            </div>
        );
    } else {
        return (
            <div className="todo-li">
                <li className="li-list">
                    <input
                        className={`li-input ${todo.completed ? 'completed' : ''}`}
                        value={todo.name}
                        readOnly
                    />

                    {todo.completed ? (
                        <button
                            className="button-complete"
                            onClick={() => onComplete(todo.id, todo.completed)}
                        >
                            <span className="text-complete">Not Done</span>
                            <i className="fa fa-check"></i>
                        </button>
                    ) : (
                        <button
                            className="button-complete"
                            onClick={() => onComplete(todo.id, todo.completed)}
                        >
                            <span className="text-complete">Done</span>
                            <i className="fa fa-check"></i>
                        </button>
                    )}

                    {todo.completed ? (
                        ''
                    ) : (
                        <button className="button-edit" onClick={onEdit}>
                            <span className="text-edit">Edit</span>
                            <i className="fa fa-edit"></i>
                        </button>
                    )}

                    <button
                        className="button-delete"
                        onClick={openModal}
                    >
                        <span className="text-delete">Delete</span>
                        <i className="fa fa-trash"></i>
                    </button>
                </li>
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title className='text'>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text'>
                        Are you sure you want to delete this todo?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(todo.id)}>
                            Yes, Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default Todo;
