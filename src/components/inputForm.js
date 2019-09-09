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
      "brabancon",
      "briard",
      "bulldog",
      "boston",
      "english",
      "french",
      "bullterrier",
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
      "cotondetulear",
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
      "germanshepherd",
      "greyhound",
      "italian",
      "groenendael",
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
      "mexicanhairless",
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
      "germanlonghair",
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
      "stbernard",
      "terrier",
      "american",
      "australian",
      "bedlington",
      "border",
      "dandie",
      "fox",
      "irish",
      "kerryblue",
      "lakeland",
      "norfolk",
      "norwich",
      "patterdale",
      "russell",
      "scottish",
      "sealyham",
      "silky",
      "tibetan",
      "toy",
      "westhighland",
      "wheaten",
      "yorkshire",
      "vizsla",
      "weimaraner",
      "whippet",
      "wolfhound",
      "irish"
      ],
      autoList: []
    }
  }

  handleChange = (event) => {
    let letter = event.target.value;
    let arr = this.state.fullList;
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].substring(0, letter.length).toLowerCase() === letter.toLowerCase()) {
        this.state.autoList.push(arr[i])
      }
    }
    if (event.target.value === 'weiner' || event.target.value === 'wiener') {
      this.setState({
        userSearch: 'dachshund'
      })
    } else {
      this.setState({
        userSearch: event.target.value,
      })
    }
  }

  handleEnterPress = (event) => {
    if (event.which === 13) {
      this.handleSubmit(event)
    } else if (event.which !== 38 && event.which !== 40) {
      this.setState({autoList: []})
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
      // console.log(response.data)
    }).catch(error => {  // If nothing matched, something went wrong on your end!
      console.log(error)
    })
  }

  getImage = () => {
    this.state.dogCard.map((dog) => {

      axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`, { Headers: { 'x-api-key': 'ffee9488-c51c-42b6-aef3-384369b9b0f4' } }).then(response => {
        // this.state.dogImages.push(...response.data)
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
            <input type="text" id="search" onChange={this.handleChange} onKeyDown={this.handleEnterPress} placeholder="e.g. Golden Retriever"></input>
            { this.state.userSearch.length > 0 ? <ul className="autocomplete">
              {this.state.autoList.map(item => {
                return(
                  <li className="autocomplete-items">{item}</li>
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
