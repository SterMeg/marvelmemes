import React from 'react';
import ReactDOM from 'react-dom';
import { Link
} from 'react-router-dom';
import axios from 'axios';
import md5 from 'js-md5';

//Installed components to allow user to choose font and color
import { SliderPicker } from 'react-color';
import FontPicker from 'font-picker-react';

//My components
import SearchBar from  './SearchBar';
import JokeCard from './JokeCard';
import QuotePicker from './QuotePicker';
import Footer from './Footer';

class GetJokes extends React.Component {
    constructor() {
        super();
        this.state = {
            activeFont: 'Comfortaa',
            background: '#eee',
            search: '',
            character: [],
            joke: [],
            image: [],
            imageLink: '../../public/assets/placeholder-01.png',
            quoteArray: [
                '../../public/assets/border-1.png',
                '../../public/assets/border-2.png',
                '../../public/assets/border-3.png',
                '../../public/assets/border-4.png',
                '../../public/assets/border-5.png',
                '../../public/assets/border-6.png'
            ],
            selectedQuote: '../../public/assets/border-1.png',
            altInfo: 'A silhouette placeholder image'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    // Searches Marvel API for character data
    getData(searchName) {
        const publicKey = 'bd988d67cbbfa81ae1862106e92ce369';
        const privateKey = 'b83fae372f4c802d745fbe837e58e7cdc7f9ec33';
        const timeStamp = Math.floor(Date.now());
        const stringToHash = timeStamp + privateKey + publicKey;
        const hash = md5(stringToHash);

        axios.get('https://gateway.marvel.com/v1/public/characters', {
            params: {
                apikey: publicKey,
                ts: timeStamp,
                hash: hash,
                name: searchName
            }
        })
            .then((res) => {
                const charArray = res.data.data.results;
                console.log(res);
                //If no character data is returned, display "character not found"
                if (charArray.length < 1) {
                    this.setState({
                        joke: 'This character was not found',
                        imageLink: '../../public/assets/placeholder-01.png',
                        altInfo: 'A silhouette placeholder image'
                    })
                    //If charcter data returned, pass data to character and image states & call joke API
                } else {
                    this.setState({
                        character: res.data.data.results[0],
                        image: res.data.data.results[0].thumbnail,
                        altInfo: `An image of the Marvel character ${res.data.data.results[0].name}`
                    });

                    this.getJoke();
                    this.createImageLink(this.state.image);
                }
            });
    }


    //Take data returned from Marvel's image data & build full URL string
    createImageLink(image) {
        const imageURL = image.path;
        const imageType = image.extension;
        const imageSize = 'portrait_uncanny';
        const fullURL = `${imageURL}/${imageSize}.${imageType}`;

        this.setState({
            imageLink: fullURL
        })
    }

    //Return random joke from joke API
    getJoke() {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json'
            }
        })
            .then((res) => {
                this.setState({
                    joke: res.data.joke
                })
            });
    }


    //Search bar handling
    handleSubmit(e) {
        e.preventDefault();
        const characterSearch = Array.from(this.state.search);

        const character = {
            value: this.state.search
        }

        characterSearch.push(character);

        this.setState({
            search: ''
        });

        this.getData(this.state.search);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //Sets state for colour picker package, allowing colour to update on user input
    handleChangeComplete (color) {
        console.log(color);
        this.setState({ 
            background: color.hex 
        });
    };

    render() {
        return (
            <main className='joke-design'>
                <div className="wrapper">
                    <SearchBar 
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                        value={this.state.search}
                        />
                    <div className="joke-container">
                        <JokeCard 
                            chosenColour={this.state.background}
                            selectedQuote={this.state.selectedQuote}
                            imageLink={this.state.imageLink}
                            joke={this.state.joke}
                            altInfo={this.state.altInfo}
                        />
                        <div className="sidebar">
                            <div className="font-container">
                                <FontPicker
                                    apiKey="AIzaSyCOaVlIvABcHc2Sda_GDclxI1ZCvWUiVj8"
                                    activeFont={this.state.activeFont}
                                    onChange={nextFont => this.setState({ activeFont: nextFont.family })}
                                    />
                                <p>Choose your font</p>
                            </div>
                            <div className="colour-container">
                                <SliderPicker
                                    color={this.state.background}
                                    onChangeComplete={this.handleChangeComplete}
                                    />
                                <p>Choose your background</p>
                            </div>
                            <QuotePicker
                                onQuoteSelect={selectedQuote => this.setState({ selectedQuote })}
                                speechBubble={this.state.quoteArray}
                                />
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        )
    }
}


export default GetJokes;