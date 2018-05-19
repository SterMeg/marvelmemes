import React from 'react';

const QuotePicker = (props) => {
    const quoteItems = props.speechBubble.map((quoteBubble, i) => {
        const onQuoteSelect = props.onQuoteSelect;
        return (
            <li key={i} onClick={() => onQuoteSelect(quoteBubble)}>
                <img src={quoteBubble} alt=""/>
            </li>
       );
    });
    return (
        <div className = "quote-picker-container">
            <p>Choose your frame</p>
            <ul className="quote-picker">
                {quoteItems}
            </ul>
        </div>
    )
};

export default QuotePicker;