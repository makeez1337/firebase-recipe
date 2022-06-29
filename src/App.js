import React, {useState} from 'react';

import FirebaseAuthService from './FirebaseAuthService';
import LoginForm from './components/loginForm';

import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    FirebaseAuthService.subscribeToAuthChanges(setUser)

    console.log(user);

    return (
        <div className="App">
            <div className="title-row">
                <h1 className="title">Firebase Recipes</h1>
                <LoginForm existingUser={user}/>
            </div>
        </div>
    );
};

export default App;