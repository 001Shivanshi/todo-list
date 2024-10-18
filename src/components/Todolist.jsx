import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; 

const Todolist = ({ todos, setTodos }) => {
    useEffect(() => {
        
        const todosCollectionRef = collection(db, 'todos');
        const unsubscribe = onSnapshot(todosCollectionRef, (snapshot) => {
            const todosArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id, 
            }));
            setTodos(todosArray); 
        });
   return () => unsubscribe(); // cleanup function
    }, [setTodos]);

    return (
        <div className="todo-ul">
            <ul>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Todolist;
