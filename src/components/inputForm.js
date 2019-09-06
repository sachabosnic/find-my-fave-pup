import React, {Component} from 'react';
import DogCard from './dogCard';
import axios from 'axios';

class InputForm extends Component {
    constructor() {
      super();
      this.state = {
        userSearch: '',
        dogCard: [],
        imagesLoaded: false,
        showDogCard: false,
        dogImages: []
      }
    }
  
    handleChange = (event) => {
      this.setState({
        userSearch: event.target.value,
      })
    }
  
    handleEnterPress = (event) => {
      if (event.which === 13) {
        this.handleSubmit(event)
      }
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.state.dogImages = []
      axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${this.state.userSearch}`).then(response => {
        this.setState({
          dogCard: response.data,
        }) 
        this.getImage()
        // console.log(response.data)
      }).catch(error => {  // If nothing matched, something went wrong on your end!
        console.log(error)
      })
      
    }

    getImage = () => {
      this.state.dogCard.map((dog) => {
        axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`, {Headers: { 'x-api-key': 'ffee9488-c51c-42b6-aef3-384369b9b0f4' }}).then(response => {
          this.state.dogImages.push(...response.data)
        }).catch(error => {  // If nothing matched, something went wrong on your end!
          console.log(error)
        })
      })

      this.setState({
        showDogCard: true
      })

      this.addImageToDogInfo(this.state.dogCard, this.state.dogImages)
    }

    addImageToDogInfo = (info, images) => {
      
    }
  
    render() {
      return (
        <div className="search-card-container">
        <div className="search" name="search">
            <label htmlFor="search">Type in your favourite dog breed!</label>
            <input type="text" id="search" onChange={this.handleChange} onKeyDown={this.handleEnterPress} placeholder="e.g. Golden Retriever"></input>
        </div>
            {this.state.showDogCard === true ? <DogCard dogInfo = {this.state.dogCard} /> : null}

        </div>
      );
    }
    
  }
  
  export default InputForm;
