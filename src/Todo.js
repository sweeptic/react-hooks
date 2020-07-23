import React, { useState, useEffect, useReducer } from 'react';
import Axios from 'axios';


const Todo = props => {

   const [todoName, setTodoName] = useState('');
   const [submittedTodo, setSubmittedTodo] = useState(null);
   // const [todoList, setTodoList] = useState(['Cook a meal']);
   // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] })


   const todoListReducer = (state, action) => {
      switch (action.type) {
         case 'ADD':
            return state.concat(action.payload);
         case 'SET':
            return action.payload;
         case 'REMOVE':
            return state.filter((todo) => todo.id !== action.payload);
         default:
            return state;
      }
   }

   const [todoList, dispatch] = useReducer(todoListReducer, [])


   //run after render cycle
   useEffect(() => {

      //didmount didupdate 
      Axios.get('https://hooks-25f42.firebaseio.com/todos.json')
         .then(res => {
            console.log(res)
            const todoData = res.data;
            const todos = [];
            for (const key in todoData) {
               todos.push({ id: key, name: todoData[key].name })
            }
            dispatch({ type: 'SET', payload: todos }); //update state -> re render -> useeffect -> update state -> re render ->......
         });
      return () => {
         //call this after pre useeffect
         console.log('cleanup')
      }
   },
      []
      //when this function run 
      //if not [] -> run every render cycle
      // [] -> mounting 
      //[todoName] -> run when value changes
   );

   const mouseMoveHandler = event => {
      console.log(event.clientX, event.clientY)
   };




   useEffect(() => {
      document.addEventListener('mousemove', mouseMoveHandler);
      return () => {
         document.removeEventListener('mousemove', mouseMoveHandler);
      }
   }, []);

   useEffect(() => {
      if (submittedTodo) {
         dispatch({ type: 'ADD', payload: submittedTodo })
      }
   }, [submittedTodo]);

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

      Axios.post('https://hooks-25f42.firebaseio.com/todos.json', { name: todoName })
         .then(res => {

            setTimeout(() => {
               const todoItem = { id: res.data.name, name: todoName }
               console.log(res);
               setSubmittedTodo(todoItem);
               //setTodoList(todoList.concat(todoItem));
            }, 3000)

         })
         .catch(err => {
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
