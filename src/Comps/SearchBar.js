import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
const SearchBar = props => {
    const [value, setValue] = useState('');
    const onSearch = (e) => {
         if (!e.target.value) {
             props.onSearchHandler('');
             setValue('');
             return;
         }
        console.log(!e.target.value);
        setValue(e.target.value);
        props.onSearchHandler(e.target.value);
    }
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' className="close-search" ></Link>
                <div className="search-books-input-wrapper">
                    <input
                        onChange={onSearch}
                        value={value}
                        type="text"
                        placeholder="Search by title or author" />
                </div>
            </div>
        </div>
    )
};
export default SearchBar;