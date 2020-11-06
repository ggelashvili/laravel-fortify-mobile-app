import React from 'react';
import {AuthProvider} from './src/AuthProvider'
import Router from './src/Router'

const App = () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default App
