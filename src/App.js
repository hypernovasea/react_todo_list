import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import './App.css';
import ListItems from './components/list-items/ListItems';


class App extends Component {

    state = {
        items: [],
        currentItem: {
        text: '',
        key:''
        }
    }

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await faCircleNotch('/express_backend');
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
                <p className="App-intro">{this.state.data}</p>
                <p>{this.state.items.text}</p>
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
            </header>
            </div>
        );
    }
}

export default App;
