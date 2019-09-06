import React, { Component } from 'react';
import InputForm from './components/inputForm';
import './styles/app.css';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
 

class App extends Component {

  constructor() {
    super(); 
    this.state = {
      
    }
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

  }

  render() {
    return (
      <div className="dogApp">
        <div className="title">
          <h1>Pup Search</h1>
          <h2>Find out everything there is to know about your favourite pups.</h2>
          <Link activeClass="active" className="search-button" to="search" spy={true} smooth={true} duration={500}><i className="fas fa-chevron-circle-down"></i></Link>
        </div>

        <Element><InputForm/></Element>
      </div>
    );
  }
  
}

export default App;
