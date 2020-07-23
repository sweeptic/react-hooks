import React, { useState } from 'react';
import Todo from './Todo';
import Header from './Header';
import Auth from './Auth';


const App = (props) => {


  const [page, setPage] = useState('auth');

  const switchPage = (pageName) => {
    setPage(pageName);
  }

  return (
    <div className="App" >
      <Header
        onLoadTodos={switchPage.bind(this, 'todos')}
        onLoadAuth={switchPage.bind(this, 'auth')}
      />
      <hr />
      {page === 'auth' ? <Auth /> : <Todo />}


    </div >
  );


}

export default App;