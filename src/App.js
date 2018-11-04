import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import 'bulma/css/bulma.min.css';

const Tasks = () => (
    <div>
        <h1>Tasks</h1>


    </div>
);

class App extends Component {
    render() {
        return (
            <Router>
                <Tasks path="/tasks" />
            </Router>
        );
    }
}

export default App;
