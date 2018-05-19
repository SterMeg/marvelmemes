import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import md5 from 'js-md5';
import Header from './Header';
import QuotePicker from './QuotePicker';

//When user inputs a character name and submits search, app either returns image of character from Marvel API or informs user that character is not found
//When image is returned, also return a random dad joke & display with image
  //Set up form to get value from search field. Store value as a variable to pass to Marvel API call name parameter.
  //Call Marvel API with searched name parameter. If result, get image extension + add image size string(from Marvel API docs) in order to get full image extension. Display image on page. If no result, inform user and ask if they would like to try a new character.
  //If description of character, also display on page?
  //Call icanhazdadjokes API for random dad joke. Return random dad joke and display on the page. Simply calling icanhazdadjokes with no parameter returns random joke. No randomizer needed.
  //*make sure to add Marvel API attribution*
  
//Stretch goals: 
  //Get random character: create randomizer component. Will need to generate 2 random numbers: one to pass into offset (# of results    / 20) and one out of 20 in order to get both random page of data and random character from page. 
    //Pass offset number into offset parameter. Return results. Use random character number to grab random character from array of results.
  //Get a different joke: when button for new joke clicked, call icanhazdadjokes API again. Return and display new returned joke.
  //Allow user to create their own "dad joke card" with different speech bubbles/ background options.
    //Put color picker onto page. When color selected, get value of color and apply color to background.
    //Provide multiple quote bubble styles that are attached to an event. When quote bubble selected, put that quote bubble on the page.
    //SUPER STRETCH: Allow user to choose font for quote. (Will research if I get here)
  //Allow user to log in to save combo. (Log in through Firebase, & use Firebase to save page data if save option is selected. Will research if I get here).

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
  }

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

      if (charArray.length < 1) {
        this.setState({
          joke: 'This character was not found',
          imageLink: '../../public/assets/04.jpg'
        })
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
    <div>
      <Header />
      <div className='joke-design'>
        <div className="wrapper">
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="search">Enter a Marvel character!</label>
            <input type="text" name="search" onChange={this.handleChange} value={this.state.search} placeholder="Enter character name" />
            <input type="submit" value="Give me a joke!" />
          </form>
          <div className="joke-container">
            <div className="joke-card">
              <img className="selected-quote" src={this.state.selectedQuote} alt=""/>
              <div className="img-container">
                <img src={this.state.imageLink} alt=""/>
              </div>
              <div className="joke-display">
                <p>{this.state.joke}</p>
              </div>
            </div>
            <QuotePicker
              onQuoteSelect={selectedQuote => this.setState({selectedQuote})}
              speechBubble={this.state.quoteArray}
            />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
