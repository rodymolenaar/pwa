import { Link } from '@reach/router'
import React from 'react'
import store from "store";
import classNames from 'classnames'

class AddTask extends React.Component {
    state = {
        task: ''
    };

    // The description character limit.
    characterLimit = 75;

    // The description character minimum.
    characterMinimum = 1;

    componentDidMount() {
        document.title = 'Add Task';
    }

    onChangeTask = e => {
        // If the new input value is higher than our character limit, don't allow it.
        if (e.target.value.length > this.characterLimit) {
            return
        }

        // Update the state
        this.setState({
            task: e.target.value
        })
    };

    onSubmit = e => {
        // Prevent default form behaviour
        e.preventDefault();

        if (this.state.task.length < this.characterMinimum) {
            return
        }

        // Get the tasks
        const tasks = store.get('tasks', []);

        // Set the new list with the new task item
        store.set('tasks', [
            ...tasks,
            {
                id: '_' + Math.random().toString(36).substr(2, 9),
                description: this.state.task,
                active: true,
                created_at: new Date(),
            }
        ]);

        // Navigate back to the tasks screen with a context prop
        this.props.navigate('/');
    }

    render() {
        return (
            <div className="container mx-auto px-4 pt-12">
                <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto bg-white">
                    <div className="px-6 py-4">
                        <form onSubmit={this.onSubmit}>
                            <div className="font-bold text-xl mb-2 flex flex-row mb-4">
                                Add task
                            </div>

                            <div className="mb-8">
                                <label className="block text-grey-darker text-sm font-medium mb-2" htmlFor="task">
                                    Description
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                    id="task" type="text" placeholder="Do the dishes..." onChange={this.onChangeTask} value={this.state.task}/>
                                <p className="text-blue-lighter text-right text-xs">{this.state.task.length} / {this.characterLimit}</p>
                            </div>

                            <button type="submit" disabled={this.state.task.length < this.characterMinimum}
                                    className={classNames(['bg-blue hover:bg-blue-dark text-white font-medium py-2 px-4 rounded mr-2', this.state.task.length < this.characterMinimum && 'opacity-50 cursor-not-allowed'])}>
                                Save
                            </button>
                            <Link to="/"
                                  className="py-2 px-4 rounded bg-grey-lighter rounded font-normal text-grey-darker hover:bg-blue-lighter hover:text-blue-dark focus:outline-none focus:shadow-outline cursor-pointer no-underline">
                                Cancel
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default AddTask;