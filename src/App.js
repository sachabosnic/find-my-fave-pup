import React, { Component } from 'react';
import InputForm from './components/inputForm';
import './styles/app.css';

class App extends Component {

  constructor() {
    super(); 
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="dogApp">
        <div className="title">
          <h1>Pup Search</h1>
          <h2>Find out everything there is to know about your favourite pups.</h2>
        </div>
        <InputForm/>
      </div>
    );
  }
  
}

export default App;
