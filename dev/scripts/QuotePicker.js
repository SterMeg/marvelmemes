import React from 'react';

const QuotePicker = (props) => {
    const quoteItems = props.speechBubble.map((quoteBubble, i) => {
        const onQuoteSelect = props.onQuoteSelect;
        return (
            <li key={i} onClick={() => onQuoteSelect(quoteBubble)}>
                <img src={quoteBubble} alt="A photo frame"/>
            </li>
       );
    });
    return (
        <div className = "quote-picker-container">
            <ul className="quote-picker">
                {quoteItems}
            </ul>
            <p>Choose your frame</p>
        </div>
    )
};

export default QuotePicker;