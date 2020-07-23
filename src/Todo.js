import React, { useState, useEffect, useReducer, useRef } from 'react';
import Axios from 'axios';
import List from './List';


const Todo = props => {
   const [inputIsValid, setinputIsValid] = useState(false);
   // const [todoName, setTodoName] = useState('');
   const todoInputRef = useRef();

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
   }, []
      //when this function run 
      //if not [] -> run every render cycle
      // [] -> mounting 
      //[todoName] -> run when value changes
   );

   const mouseMoveHandler = event => {
      console.log(event.clientX, event.clientY)
   };


   const inputValidationHandler = event => {
      if (event.target.value.trim() === '') {
         setinputIsValid(false);
      } else {
         setinputIsValid(true);
      }
   };





   // useEffect(() => {
   //    document.addEventListener('mousemove', mouseMoveHandler);
   //    return () => {
   //       document.removeEventListener('mousemove', mouseMoveHandler);
   //    }
   // }, []);


   const todoAddHandler = () => {

      const todoName = todoInputRef.current.value;

      Axios.post('https://hooks-25f42.firebaseio.com/todos.json', { name: todoName })
         .then(res => {

            setTimeout(() => {
               const todoItem = { id: res.data.name, name: todoName }
               console.log(res);
               dispatch({ type: 'ADD', payload: todoItem })
            }, 3000)

         })
         .catch(err => {
            console.log(err);
         })
   }

   const todoRemoveHandler = todoId => {
      Axios.delete(`https://hooks-25f42.firebaseio.com/todos/${todoId}.json`)
         .then((res) => {
            dispatch({ type: 'REMOVE', payload: todoId })
         })
         .catch((err) => console.log(err))
   }

   return (
      <React.Fragment>
         <input
            type="text"
            placeholder="Todo"
            ref={todoInputRef}
            onChange={inputValidationHandler}
            style={{ backgroundColor: inputIsValid ? 'transparent' : 'red' }}
         />
         <button type="button" onClick={todoAddHandler}>Add</button>
         <List items={todoList} onClick={todoRemoveHandler} />
      </React.Fragment>
   )
}

export default Todo
