import React from 'react';

const JokeCard = (props) => {
    return (
        <div style={{ background: `${props.chosenColour}` }} className="joke-card">
            <img className="selected-quote" src={props.selectedQuote} alt={props.altInfo} />
            <div className="img-container">
                <img src={props.imageLink} alt="" />
            </div>
            <div className="joke-display">
                <p className="apply-font">{props.joke}</p>
            </div>
        </div>
    )
}

export default JokeCard;