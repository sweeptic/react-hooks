import React, { useState } from 'react';

const Todo = props => {

   // const [todoName, setTodoName] = useState('');
   // const [todoList, setTodoList] = useState(['Cook a meal']);
   const [todoState, setTodoState] = useState({ userInput: '', todoList: [] })

   const inputChangeHandler = (event) => {
      setTodoState({
         userInput: event.target.value,
         todoList: todoState.todoList
      });
   };


   const todoAddHandler = () => {
      setTodoState({
         userInput: todoState.userInput,
         todoList: [...todoState.todoList, todoState.userInput]
      });
   }

   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            onChange={inputChangeHandler}
            value={todoState.userInput}
         />
         <button type="button" onClick={todoAddHandler}>Add</button>
         <ul>
            {todoState.todoList.map((todo, index) => (<li key={index} >{todo}</li>))}
         </ul>
      </React.Fragment>
   )
}

export default Todo
