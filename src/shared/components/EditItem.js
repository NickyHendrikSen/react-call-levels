// import './App.css';
import React from 'react';
import "./EditItem.scss"
import axios from 'axios'
import {Button, TextField} from '@material-ui/core'

class App extends React.Component {
  state = {
    id: 0,
    name: '',
    price: 0
  }

  constructor(props){
      super(props);
      this.state = {
        id: props.id,
        name: props.name,
        price: props.price
      }
  }

  editItem = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/api/editItem", 
      new URLSearchParams({
        ID: this.state.id,
        name: this.state.name + "",
        price: this.state.price + ""
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
    console.log('asd')
    this.setState({[name]: value})
  }

  render(){
    return (
      <div className="Edit">
        <div className="EditDiv">
          <p>Edit Item</p>
          <form onSubmit={this.editItem}>
            <div className="input">
              <TextField name="name" label="Name" variant="outlined" value={this.state.name} onChange={this.handleChange()}/>
            </div>
            <div className="input">
              <TextField name="price" type="number" label="Price" variant="outlined" value={this.state.price} onChange={this.handleChange()}/>
            </div>
            <div className="input button-form">
              <Button variant="contained" type="submit">Edit</Button>
              <Button variant="contained" color="secondary" onClick={this.props.closePopUp}>Close</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
