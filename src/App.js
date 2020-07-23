import React, { useState } from 'react';
import Todo from './Todo';
import Header from './Header';
import Auth from './Auth';
import AuthContext from './auth-context';



const App = (props) => {

  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = (pageName) => {
    setPage(pageName);
  }

  const login_function = () => {
    setAuthStatus(true);
  }

  return (
    <div className="App" >

      <AuthContext.Provider value={{status: authStatus, login: login_function}}>
        <Header
          onLoadTodos={switchPage.bind(this, 'todos')}
          onLoadAuth={switchPage.bind(this, 'auth')}
        />
        <hr />
        {page === 'auth' ? <Auth /> : <Todo />}
      </AuthContext.Provider>

    </div >


  );


}

export default App;