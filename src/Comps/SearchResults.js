import Book from "./Book";
import React from "react";
const SearchResluts = props => {
    const isShelfEmpty = (props.books.length === 0);
    return (
        <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelfName}</h2>
                  <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        isShelfEmpty &&
                        <p>No Books Found</p>
                    }
                        {!isShelfEmpty &&                           
                        props.books.map(book =>
                            <Book
                                onChangeBookShelf={props.onChangeBookShelf}
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                url={(book.imageLinks&&book.imageLinks.thumbnail) || ''}
                                authors={book.authors && book.authors.join(' , ')}
                                shelf={book.shelf || 'none'}
                                book={book}
                            />
                        )}
                    </ol>
                  </div>
                </div>
    )
}

export default SearchResluts;