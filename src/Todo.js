import React, { useState } from 'react';
import Axios from 'axios';


const Todo = props => {

   const [todoName, setTodoName] = useState('');
   const [todoList, setTodoList] = useState(['Cook a meal']);
   // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] })

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
            {todoList.map((todo, index) => (<li key={index} >{todo}</li>))}
         </ul>
      </React.Fragment>
   )
}

export default Todo
