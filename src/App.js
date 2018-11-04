import React, { Component } from 'react';
import { Router } from '@reach/router';
import Tasks from './Tasks'
import AddTask from './AddTask'

class App extends Component {
    render() {
        return (
            <Router>
                <Tasks path="/" />
                <AddTask path="/tasks/create" />
            </Router>
        );
    }
}

export default App;
