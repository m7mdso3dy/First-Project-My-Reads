import React from "react";
import { Fragment } from "react"
import SearchBar from "./SearchBar";
import SearchResluts from "./SearchResults";
import { search } from "../BooksAPI";
import { useState,useEffect } from "react";

const Search = props => {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    //console.log(props.books.length)
    useEffect(() => {
        const searchBooks = async (val) => {
            let updatedSearchedBooks = await search(val);
            if (Array.isArray(updatedSearchedBooks)) {
                updatedSearchedBooks = updatedSearchedBooks.map(book => {
                    for (let i = 0; i < props.books.length; i++) {
                        if (book.id === props.books[i].id) {
                            book.shelf = props.books[i].shelf;
                            return book;
                        } 
                    }
                    return book;
                })
                setSearchedBooks(updatedSearchedBooks);
            } else if (typeof updatedSearchedBooks === 'object') {
                
                setSearchedBooks(updatedSearchedBooks.items)
            }
            
        };
        if (searchValue) {
            searchBooks(searchValue);
        } else {
            setSearchedBooks([]);
        }
        
    }, [searchValue,props.books]);

    const searchBooksHandler = (value) => {
        setSearchValue(value); 
    }
    return (
        <Fragment>
            <SearchBar
                onSearchHandler={searchBooksHandler}
            ></SearchBar>
            {<SearchResluts
                onChangeBookShelf={props.onChangeBookShelf}
                shelfName='Search results'
                books={searchedBooks}
            ></SearchResluts>}
        </Fragment>
    )
};
export default Search;