// import './App.css';
import React from 'react';
import "./style.scss"
import axios from 'axios'
import EditItem from './shared/components/EditItem'
import {Button, TextField} from '@material-ui/core'

class App extends React.Component {
  state = {
    items: [],
    params: {
      name: '',
      price: 0
    },
    popup: {
      show: false,
      id: 0,
      name: '',
      price: 0,
    }
  }

  getItem = () => {
    axios.get("http://localhost:3001/api/getItem")
    .then(res => {
      this.setState({"items": res.data})
    })
  }

  deleteItem = (event) => {
    axios.get("http://localhost:3001/api/deleteItem/" + event.target.value)
    .then(res => {
      this.getItem()
    })
  }

  componentDidMount(){
    this.getItem()
  }

  insertItem = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/api/insertItem", 
      new URLSearchParams({
        name: this.state.params.name + "",
        price: this.state.params.price + ""
      }),{
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => {
      console.log(res)
      this.getItem()
    })
  }

  handleChange = () => (event) => {
    let name = event.target.name
    let value = event.target.value
    if(name === "price"){
      this.setState({"params": {
        name: this.state.params.name,
        price: value}})
    }
    else if(name === "name"){
      this.setState({"params": {
        name: value,
        price: this.state.params.price}})
    }
  }

  editItem = (item) => {
    console.log(item)
    this.setState({popup: {
      show: true,
      id: item.ID,
      name: item.Name,
      price: item.Price,
    }})
  }

  closePopUp = () => {
    this.setState({popup: {
      show: false,
      id: 0,
      name: '',
      price: 0,
    }})
  }

  render(){
    return (
      <div className="App">
        {this.state.popup.show ? <EditItem id={this.state.popup.id} name={this.state.popup.name} 
          price = {this.state.popup.price} closePopUp = {this.closePopUp}
          getItem = {this.getItem}/> : ""}
        <div className="Wrapper">
          <div className="AddDiv">
            <p>New Item</p>
            <form onSubmit={this.insertItem}>
              <div className="input">
                <TextField name="name" label="Name" variant="outlined" value={this.state.params.name} onChange={this.handleChange()}/>
              </div>
              <div className="input">
                <TextField name="price" type="number" label="Price" variant="outlined" value={this.state.params.price} onChange={this.handleChange()}/>
              </div>
              <div className="input">
                <Button variant="contained" type="submit">Insert</Button>
              </div>
            </form>
          </div>
          <div className="ViewDiv">
            <p>Item List</p>
            <hr></hr>
            <div className="Items">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.items.length > 0 ? this.state.items.map(item => (
                  <tr key = {item.ID}>
                    <td>{item.Name}</td>
                    <td>{item.Price}</td>
                    <td>
                      <Button variant="contained" onClick={() => this.editItem(item)} >Edit</Button>
                      <Button variant="contained" onClick={this.deleteItem} value={item.ID}>Delete</Button>
                      </td>
                  </tr>
                )) : (<tr><td colSpan="4">No Items</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
