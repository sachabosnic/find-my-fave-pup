import React, { Component } from 'react';
import InputForm from './components/inputForm';
import './App.css';

class App extends Component {

  constructor() {
    super(); 
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="dogApp">
        <InputForm/>
      </div>
    );
  }
  
}

export default App;
