import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <h1>Marvel at my dad jokes!</h1>
                <div className="image-container">
                    <img src="../../public/assets/lightning.svg" alt=""/>
                </div>
                <div className="display-box">
                    <h2 className="heading-left">Marvel characters</h2>
                    <h2 className="heading-right">Dad Jokes</h2>
                </div>
                <p>Choose your character! Get a dad joke!</p>
                <p>Customize your joke card!</p>
                <button>Let's Do It!</button>
            </div>
        </header>
    )
}

export default Header;