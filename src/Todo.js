import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const Todo = props => {

   const [todoName, setTodoName] = useState('');
   const [todoList, setTodoList] = useState(['Cook a meal']);
   // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] })


   //run after render cycle
   useEffect(() => {
      Axios.get('https://hooks-25f42.firebaseio.com/todos.json')
         .then(res => {
            console.log(res)
            const todoData = res.data;
            const todos = [];
            for (const key in todoData) {
               todos.push({ id: key, name: todoData[key].name })
            }
             setTodoList(todos); //update state -> re render -> useeffect -> update state -> re render ->......
         });
   }, []);

   const inputChangeHandler = (event) => {
      // setTodoState({
      //    userInput: event.target.value,
      //    todoList: todoState.todoList
      // });
      setTodoName(event.target.value)
   };


   const todoAddHandler = () => {
      // setTodoState({
      //    userInput: todoState.userInput,
      //    todoList: [...todoState.todoList, todoState.userInput]
      // });
      setTodoList(todoList.concat(todoName));
      Axios.post('https://hooks-25f42.firebaseio.com/todos.json', { name: todoName })
         .then(res => {
            console.log(res);
         }).catch(err => {
            console.log(err);
         })
   }

   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            onChange={inputChangeHandler}
            value={todoName}
         />
         <button type="button" onClick={todoAddHandler}>Add</button>
         <ul>
            {todoList.map((todo, index) => (<li key={todo.id} >{todo.name}</li>))}
         </ul>
      </React.Fragment>
   )
}

export default Todo
