import React from 'react'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import store from 'store'
import classNames from 'classnames'

class Task extends React.Component {
    // Update this task.
    updateTask = task => {
        const { refreshTasks } = this.props;

        // Get current tasks from store
        const tasks = store.get('tasks', []);

        // Set the updated list
        store.set('tasks', tasks.map(t => {
            if (t.id === task.id) {
                return task;
            }

            return t;
        }));

        console.log('Task updated!');

        // Refresh parent state by function prop
        refreshTasks();
    };

    // Delete this task.
    deleteTask = () => {
        const { refreshTasks, ...task } = this.props;

        // Get current tasks from store
        const tasks = store.get('tasks', []);

        // Set the updated list
        store.set('tasks', tasks.filter(t => t.id !== task.id));

        console.log('Task deleted!');

        // Refresh parent state by function prop
        refreshTasks();
    };

    // Set the task active status to either true or false.
    onCheck = (event, checked) => {
        const { refreshTasks, ...task } = this.props;

        // Update task
        this.updateTask({
            ...task,
            active: !checked,
        });

        console.log('Task checked!');
    };

    render() {
        const { description, active } = this.props;

        return (
            <div
                className={classNames(['appearance-none border rounded w-full py-2 pr-4 pl-1 text-grey-darker leading-tight mb-3 focus:outline-none focus:shadow-outline flex flex-row justify-start items-center', !active && 'bg-grey-lighter' ])}>
                <Checkbox checked={!active} onChange={this.onCheck}/>
                <span className={[ !active && 'line-through' ]}>{description}</span>
                <button onClick={this.deleteTask}
                    className="ml-auto py-1 px-3 rounded bg-grey-lighter rounded text-xs text-grey-darker hover:bg-red-lighter hover:text-red-dark focus:outline-none focus:shadow-outline cursor-pointer no-underline">
                    Delete
                </button>
            </div>
        );
    };
}

export default Task;