import React, { Component } from 'react'


class DogCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: '',
            toggle: false
        }
    }

    handleClick = (index) => {
        this.setState({ index, toggle: !this.state.toggle })
    }


    render() {
        return (
            <div className="card-container">
                {this.props.dogInfo && this.props.dogInfo.length > 0 ?
                    <ul className="card-set">
                        {this.props.dogInfo && this.props.dogInfo.map((dog, id) => {
                            return (
                                <li key={id} className="card">
                                    {dog.dogImageUrl !== undefined ? <img src={`${dog.dogImageUrl}`} alt={`${dog.name}`} /> : <img src="http://www.uoduckstore.com/c.3841022/sca-dev-montblanc/img/no_image_available.jpeg" alt=""/>}
                                    <p className="breed">{dog.name}</p>
                                    <p>Size: {dog.weight.imperial} lbs</p>
                                    {this.state.index === id && this.state.toggle === true ?
                                        <div className="more-info">
                                            <p>Temperament: {dog.temperament !== undefined ? dog.temperament : 'NA'}</p>
                                            <p>Bred for: {dog.bred_for !== undefined ? dog.bred_for : 'NA'}</p>
                                            <p>Life span: {dog.life_span !== undefined ? dog.life_span : 'NA'}</p>
                                        </div>
                                        : null}
                                    <button onClick={() => this.handleClick(id)}>{this.state.index === id && this.state.toggle === true ? 'Read Less' : 'Read More'}</button>
                                </li>)
                        })}
                    </ul> :
                    <p>Sorry, that yielded no results. Did you mean ?</p>}
            </div>
        );
    }
}

export default DogCard;