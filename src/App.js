import React, { Component } from 'react';
import './App.css';
import ListItem from './components/list-item/ListItem';
import FlipMove from 'react-flip-move';

// This version of the application is not using react hooks
class App extends Component {

    state = {
        items: [],
        currentItem: {
            task: '',
            key:'',
            is_done: false
        }
    }

    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    componentDidMount() {
        this.fetchTodos()
            .then(res => this.setState({ items: res.tasks }))
            .catch(err => console.log(err));
    }

    fetchTodos = async () => {
        const response = await fetch('/api/todos/');
        const body = await response.json();
        console.log("current tasks: " + JSON.stringify(body.tasks));
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    addItem = async (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
            if(newItem.task !== "") {

                const response = await fetch('/api/todos/', {
                    method: 'POST',
                    headers: this.headerss,
                    body: JSON.stringify({
                        task: newItem.task,
                        is_done: false
                    })
                });
                const body = await response.json();

                if(body.success) {
                    newItem.key = body.taskId[0];
                    newItem.is_done = false;

                    const items = [...this.state.items, newItem];

                    this.setState({
                        items: items, 
                        currentItem: {
                            task:'',
                            key:'',
                            is_done: false
                        }
                    })
                }
            }
    }

    handleInput = (e) => {
        this.setState({
            currentItem: {
                task: e.target.value,
                key: Date.now(),
                is_done: false
            }
        })
    }

    deleteItem = async (key) => {
        const apiRoute = '/api/todos/' + key;

        const response = await fetch(apiRoute, {
            method: 'DELETE',
            headers: this.headers
        });

        const body = await response.json();
        if(body.success) {
            const filteredItems = this.state.items.filter(item => 
                item.id !== key);
            this.setState({
                items: filteredItems
            })
        }
    }

    startUpdate = (event, key) => {
        const taskIndex = this.state.items.findIndex(t => {
            return t.id === key;    
        })

        const foundTask = {
            ...this.state.items[taskIndex]
        };

        foundTask.task = event.target.value;

        const tasks = [...this.state.items];
        tasks[taskIndex] = foundTask;

        this.setState({items: tasks})

    }

    finalizeUpdate = async(event, key, updatedTask) => {
        if(event.keyCode === 13 && updatedTask !== "") {

            const apiRoute = '/api/todos/' + key;

            const response = await fetch(apiRoute, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify({
                    task: updatedTask,
                    is_done: false
                })
            });

            const body = await response.json();
            if(body.success) {
                console.log("response body:" + body.message);
            }
        }

    }

    // setUpdate = (event, task, key) => {
    //     console.log("items" + JSON.stringify(this.state.items));
    //     const items = this.state.items;
    //     items.map(item => {
    //         if(item.key === key) {
    //             console.log(item.key + ", " + key);
    //             item.task = task;
    //         }
    //     })
    //     this.setState({
    //         items: items
    //     })
    // }

    render() {
        let tasks = (
            <div>
                {this.state.items.map(item => {
                    
                    return <ListItem
                        item={item} 
                        deleteItem={this.deleteItem} 
                        startUpdate={this.startUpdate}
                        finalizeUpdate={this.finalizeUpdate}
                    />
                })}
            </div>
        );

        return (
            <div className="App">
                <header>
                    <form id="to-do-form" onSubmit={this.addItem}>
                        <input type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput}></input>
                        <button type="submit">Add</button>
                    </form>
                    {/* <p className="App-intro">{this.state.data}</p> */}
                    <p>{this.state.items.text}</p>
                    <div>
                        <FlipMove duration={300} easing="ease-in-out">
                            {tasks}
                        </FlipMove>
                    </div>
                </header>
            </div>
        );
    }

}

export default App;


/*
// HOOK Syntax
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ListItems from './components/list-items/ListItems';

function App() {

    const [todos, setTodos] = useState(null);

    const fetchTodos = async () => {
        const response = await axios.get();
    }

    return (

    );
}

const rootElement = document.getElementById('root);
ReactDOM.render(<App />, rootElement);
 */
