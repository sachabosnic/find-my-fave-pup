import React, { Component } from 'react';
import DogCard from './dogCard';
import axios from 'axios';

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      userSearch: '',
      dogCard: [],
      showDogCard: false,
      dogImages: [],
      imageLoaded: false,
      fullList: [
      "affenpinscher",
      "african",
      "airedale",
      "akita",
      "appenzeller",
      "basenji",
      "beagle",
      "bluetick",
      "borzoi",
      "bouvier",
      "boxer",
      "briard",
      "bulldog",
      "boston",
      "english",
      "french",
      "bull terrier",
      "staffordshire",
      "cairn",
      "cattledog",
      "australian",
      "chihuahua",
      "chow",
      "clumber",
      "cockapoo",
      "collie",
      "border",
      "coonhound",
      "corgi",
      "cardigan",
      "coton de tulear",
      "dachshund",
      "dalmatian",
      "dane",
      "great",
      "deerhound",
      "scottish",
      "dhole",
      "dingo",
      "doberman",
      "elkhound",
      "norwegian",
      "entlebucher",
      "eskimo",
      "frise",
      "bichon",
      "german shepherd",
      "greyhound",
      "italian",
      "kooikerhondje",
      "hound",
      "afghan",
      "basset",
      "blood",
      "english",
      "ibizan",
      "walker",
      "husky",
      "keeshond",
      "kelpie",
      "komondor",
      "kuvasz",
      "labrador",
      "leonberg",
      "lhasa",
      "malamute",
      "malinois",
      "maltese",
      "mastiff",
      "bull",
      "english",
      "tibetan",
      "mix",
      "mountain",
      "bernese",
      "swiss",
      "newfoundland",
      "otterhound",
      "papillon",
      "pekinese",
      "pembroke",
      "pinscher",
      "miniature",
      "pointer",
      "german",
      "german longhair",
      "pomeranian",
      "poodle",
      "miniature",
      "standard",
      "toy",
      "pug",
      "puggle",
      "pyrenees",
      "redbone",
      "retriever",
      "chesapeake",
      "curly",
      "flatcoated",
      "golden",
      "ridgeback",
      "rhodesian",
      "rottweiler",
      "saluki",
      "samoyed",
      "schipperke",
      "schnauzer",
      "giant",
      "miniature",
      "setter",
      "english",
      "gordon",
      "irish",
      "sheepdog",
      "english",
      "shetland",
      "shiba",
      "shihtzu",
      "spaniel",
      "blenheim",
      "brittany",
      "cocker",
      "irish",
      "japanese",
      "sussex",
      "welsh",
      "springer",
      "english",
      "saint bernard",
      "terrier",
      "american",
      "australian",
      "bedlington",
      "border",
      "dandie",
      "fox",
      "irish",
      "lakeland",
      "norfolk",
      "norwich",
      "patterdale",
      "russell",
      "scottish",
      "sealyham",
      "silky",
      "tibetan",
      "west highland",
      "wheaten",
      "yorkshire",
      "vizsla",
      "weimaraner",
      "whippet",
      "wolfhound",
      "irish",
      "shepherd",
      "wiener"
      ],
      autoList: [],
      position: 0
    }
  }

  handleAutocomplete = (event) => {
    this.setState({userSearch: event.target.id})
    console.log(this.state.userSearch)
    console.log(event.target.id)
  }

  handleChange = (event) => {
    let letter = event.target.value;
    let arr = this.state.fullList;
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].substring(0, letter.length).toLowerCase() === letter.toLowerCase()) {
        this.state.autoList.push(arr[i])
      }
    }
    if (event.target.value === 'wiener') {
      this.setState({
        userSearch: 'dachshund'
      })
    } else {
      this.setState({
        userSearch: event.target.value,
      })
    }
  }

  increment = () => {
      let number = this.state.position
      number++
      this.setState({position: number})
  }
  

  handleKeyPress = (event) => {
    let position = this.state.position
     
    if (event.which === 13) {
      this.handleSubmit(event)
      this.setState({autoList: []})
    } else if (event.which !== 38 && event.which !== 40) {
      this.setState({autoList: []})
    } else if (event.which === 40) {
      this.increment()
      let child = document.getElementById("autocomplete").childNodes[position].innerHTML;
      console.log(child)
      console.log(position)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      dogImages: []
    })
    axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${this.state.userSearch}`).then(response => {
      this.setState({
        dogCard: response.data,
      })
      this.getImage()
      this.setState({userSearch: ''})
    }).catch(error => {  // If nothing matched, something went wrong on your end!
      console.log(error)
    })
  }

  getImage = () => {
    this.state.dogCard.map((dog) => {

      axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`, { Headers: { 'x-api-key': 'ffee9488-c51c-42b6-aef3-384369b9b0f4' } }).then(response => {
        
        const responseData = [...response.data];
        const dogImageObject = {};

        this.assignImage(responseData, dogImageObject, dog);
      }).catch(error => {  // If nothing matched, something went wrong on your end!
        console.log(error)
      })
    })

    this.setState({
      showDogCard: true
    })

  }

  assignImage = (responseData, dogImageObject, dog) => {
    responseData.map((dogData) => {
      dogImageObject[dogData.breeds[0].id] = dogData.url;
    });

    dog.dogImageUrl = dogImageObject[dog.id];

    this.setState({
      imageLoaded: true
    })
  };

  

  render() {
    return (
      <div className="search-card-container">
        <div className="search" name="search">
          <label htmlFor="search">Type in your favourite dog breed!</label>
          <div className="full-input">
            <input type="text" id="search" onChange={this.handleChange} onKeyDown={this.handleKeyPress} placeholder="e.g. Golden Retriever"></input>
            {this.state.userSearch.length > 0 ? <ul id="autocomplete" className="autocomplete">
              {this.state.autoList.map((item, n) => {
                return(
                  <li key={`${n}`} id={`${item}`} className="autocomplete-items" onMouseOver={this.handleAutocomplete} onClick={this.handleSubmit}>{item}</li>
                )
              })} 
            </ul> : null}
          </div>
        </div>
        {this.state.imageLoaded === true && this.state.showDogCard === true ? <DogCard dogInfo={this.state.dogCard} /> : null}
      </div>
    );
  }

}

export default InputForm;
