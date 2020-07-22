import React, { useState } from 'react';

const Todo = props => {

   //[current state, handler function]
   const [todoName, setTodoName] = useState('');
   console.log(inputState)

   const inputChangeHandler = (event) => {
      setTodoName(event.target.value);
   };

   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            onChange={inputChangeHandler}
            value={todoName}
         />
         <button type="button">Add</button>
         <ul />
      </React.Fragment>
   )
}

export default Todo
