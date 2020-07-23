import React from 'react'

const AuthContext = React.createContext({ status: false, login_f: () => { } });

export default AuthContext