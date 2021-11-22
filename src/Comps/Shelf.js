import React from "react";
import { Fragment } from "react";
import Book from "./Book";

const Shelf = props => {
    const isShelfEmpty = (props.books.length === 0);
    return (
        <Fragment>
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelfName}</h2>
                  <div className="bookshelf-books">
                    {
                        isShelfEmpty &&
                        <p>No Books Here</p>
                    }
                    {!isShelfEmpty &&
                        <ol className="books-grid">
                        
                        
                        {props.books.map(book =>
                            <Book
                                onChangeBookShelf={props.onChangeBookShelf}
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                url={(book.imageLinks&&book.imageLinks.thumbnail) || ''}
                                authors={book.authors && book.authors.join(' , ')}
                                shelf={book.shelf}
                                book={book}

                            />
                        )}
                    </ol>
                    }
                  </div>
                </div>
        </Fragment>
    )
}

export default Shelf;