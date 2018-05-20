import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import md5 from 'js-md5';
import { SliderPicker } from 'react-color';
import FontPicker from 'font-picker-react';
import {Link
} from 'react-router-dom';
import QuotePicker from './QuotePicker';

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
            selectedQuote: '../../public/assets/border-1.png'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    // 
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

                //If no character data is returned, display "character not found"
                if (charArray.length < 1) {
                    this.setState({
                        joke: 'This character was not found',
                        imageLink: '../../public/assets/04.jpg'
                    })
                    //If charcter data returned, pass data to character and image states & call joke API
                } else {
                    this.setState({
                        character: res.data.data.results[0],
                        image: res.data.data.results[0].thumbnail
                    });

                    this.getJoke();
                    this.createImageLink(this.state.image);
                }
            });
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

    handleChangeComplete (color) {
        console.log(color);
        this.setState({ 
            background: color.hex 
        });
    };



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

    render() {
        return (
            <main className='joke-design'>
                <div className="wrapper">
                    <form action="" onSubmit={this.handleSubmit}>
                        <label htmlFor="search">Enter a Marvel character!</label>
                        <input type="text" name="search" onChange={this.handleChange} value={this.state.search} placeholder="Enter character name" />
                        <input type="submit" value="Give me a joke!" />
                    </form>
                    <div className="joke-container">
                        <div style={{ background: `${this.state.background}` }} className="joke-card">
                            <img className="selected-quote" src={this.state.selectedQuote} alt="" />
                            <div className="img-container">
                                <img src={this.state.imageLink} alt="" />
                            </div>
                            <div className="joke-display">
                                <p className="apply-font">{this.state.joke}</p>
                            </div>
                        </div>
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
                </div>
            </main>
        )
    }
}


export default GetJokes;