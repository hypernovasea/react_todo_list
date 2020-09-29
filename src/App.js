import React, { Component } from 'react';
import './App.css';
import ListItems from './components/list-items/ListItems';

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

    componentDidMount() {
        this.fetchTodos()
            .then(res => this.setState({ items: res.tasks }))
            .catch(err => console.log(err));
    }

    fetchTodos = async () => {
        const response = await fetch('/api/todos/');
        const body = await response.json();

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
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
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
        console.log("id: " + key);
        const apiRoute = '/api/todos/' + key;
        console.log("route: " + apiRoute);

        const response = await fetch(apiRoute, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
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

    setUpdate = (task, key) => {
        console.log("items" + JSON.stringify(this.state.items));
        const items = this.state.items;
        items.map(item => {
            if(item.key === key) {
                console.log(item.key + ", " + key);
                item.task = task;
            }
        })
        this.setState({
            items: items
        })
    }

    render() {
        return (
            <div className="App">
            <header>
                <form id="to-do-form" onSubmit={this.addItem}>
                    <input type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput}></input>
                    <button type="submit">Add</button>
                </form>
                {/* <p className="App-intro">{this.state.data}</p> */}
                <p>{this.state.items.text}</p>
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
            </header>
            </div>
        );
    }

}

export default App;


/*
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
