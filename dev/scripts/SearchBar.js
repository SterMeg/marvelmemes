import React from 'react';

const SearchBar = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <label htmlFor="search">Enter a Marvel character:</label>
            <input type="text" name="search" onChange={props.onChange} value={props.value} placeholder="Enter character name" />
            <input type="submit" value="Give me a joke!" />
        </form>
    )
}

export default SearchBar;