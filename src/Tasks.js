import { Link } from '@reach/router'
import emptyTasks from './images/tasks.svg'
import React from 'react'
import store from "store";
import Task from './components/Task'
import { orderBy } from 'lodash';
import defaultTasks from './defaultTasks'

class Tasks extends React.Component {
    state = {
        tasks: []
    }

    async componentDidMount() {
        // Load tasks on mount and wait for it to finish.
        await this.loadTasks();

        // Set the page title.
        document.title = `Tasks (${this.state.tasks.length})`;
    }

    loadTasks = () => {
        // Get the tasks, if there aren't any load the defaults  — defaultTasks will empty when adding a new task
        const tasks = store.get('tasks', defaultTasks);

        // Update the state to re-render
        this.setState({
            tasks
        });

        console.log('Tasks updated!', tasks);
    };

    render() {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto bg-white">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 flex flex-row">
                            Tasks
                            <Link to="/tasks/create"
                                  className="ml-auto inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-normal text-grey-darker hover:bg-blue-lighter hover:text-blue-dark focus:outline-none focus:shadow-outline cursor-pointer no-underline">Add
                                task</Link>
                        </div>

                        {/* If there aren't any tasks show a nice empty screen */}
                        {!this.state.tasks.length > 0 && (
                            <>
                                <div className="p-8">
                                    <img src={emptyTasks} className="w-full" alt="logo"/>
                                </div>

                                <p className="p-8 text-grey-darker text-base text-center">
                                    It seems you don't have any tasks yet.
                                </p>
                            </>
                        )}

                        {this.state.tasks.length > 0 && (
                            <div className="py-4">
                                {/* Render tasks and pass refreshTasks function */}
                                {orderBy(this.state.tasks, ['active', 'created_at'], ['desc', 'desc']).map(task => <Task key={task.id} {...task} refreshTasks={this.loadTasks} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
}

export default Tasks;