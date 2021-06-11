// import './App.css';
import React from 'react';
import "./style.scss"
import axios from 'axios'
import {Button, TextField} from '@material-ui/core'

class App extends React.Component {
  state = {
    items: []
  }

  componentDidMount(){
    axios.get("http://localhost:3001/getItem")
    .then(res => {
      this.setState({"items": res.data})
    })
  }

  render(){
    return (
      <div className="App">
        <div className="AddDiv">
          <p>New Item</p>
          <form>
            <div className="input">
              <TextField name="name" label="Name" variant="outlined" />
            </div>
            <div className="input">
              <TextField name="price" type="number" label="Price" variant="outlined" />
            </div>
            <div className="input">
              <Button variant="contained">Insert</Button>
            </div>
          </form>
        </div>
        <div>
          
        </div>
      </div>
    );
  }
}

export default App;
