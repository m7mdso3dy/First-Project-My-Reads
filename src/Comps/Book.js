import { Fragment } from "react"
import React from "react";
const Book = props => {
    const changeBookShelfValueHandler = (e) => {
        props.onChangeBookShelf(e.target.value, props.book);
    }
    return (
        <Fragment>
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.url})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={props.shelf} onChange={changeBookShelfValueHandler}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{props.title}</div>
                    <div className="book-authors">{props.authors}</div>
                </div>
            </li>
                      
        </Fragment>
    )
}

export default Book;