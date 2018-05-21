import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import GetJokes from'./GetJokes';
import LandingPage from './LandingPage';

//When user inputs a character name and submits search, app either returns image of character from Marvel API or informs user that character is not found
//When image is returned, also return a random dad joke & display with image
  //Set up form to get value from search field. Store value as a variable to pass to Marvel API call name parameter.
  //Call Marvel API with searched name parameter. If result, get image extension + add image size string(from Marvel API docs) in order to get full image extension. Display image on page. If no result, inform user and ask if they would like to try a new character.
  //Display Marvel attribution to comply with API use
  //Call icanhazdadjokes API for random dad joke. Return random dad joke and display on the page. Simply calling icanhazdadjokes with no parameter returns random joke. No randomizer needed.
  
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
  
  //Renders the Landing Page and Get Jokes components. Uses React router to generate "separate pages". Eventually should be refactored to move calls for data and GetJokes states back into main App class; however, as the first page is a simple landing page, and no cross-data is needed, all states are moved into GetJokes for now.

  render() {
    return (
    <Router>
      <div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/joke-generator" exact component={GetJokes} />
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
