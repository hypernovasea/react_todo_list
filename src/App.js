import React, { Component } from 'react';
import './App.css';
import ListItems from './components/list-items/ListItems';

// This version of the application is not using react hooks
class App extends Component {

    state = {
        items: [],
        currentItem: {
            text: '',
            key:''
        },
        data: null
    }

    // componentDidMount() {
    //     this.callBackendAPI()
    //         .then(res => this.setState({ data: res.express }))
    //         .catch(err => console.log(err));
    // }

    // callBackendAPI = async () => {
    //     const response = await fetch('/express_backend');
    //     const body = await response.json();

    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // }

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

    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if(newItem.text !== "") {
            const items = [...this.state.items, newItem];

            this.setState({
                items: items, 
                currentItem: {
                    text:'',
                    key:''
                }
            })
        }
    }

    handleInput = (e) => {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }
        })
    }

    deleteItem = (key) => {
        const filteredItems = this.state.items.filter(item => 
            item.key !== key);
        this.setState({
            items: filteredItems
        })
    }

    setUpdate = (text, key) => {
        console.log("items" + this.state.items);
        const items = this.state.items;
        items.map(item => {
            if(item.key === key) {
            console.log(item.key + " " + key);
            item.text = text;
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
    // render() {
    //     return (
    //       <div className="App">
    //         <header className="App-header">
    //           {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //           <h1 className="App-title">Welcome to React</h1>
    //         </header>
    //         <p className="App-intro">{this.state.data}</p>
    //       </div>
    //     );
    // }

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
