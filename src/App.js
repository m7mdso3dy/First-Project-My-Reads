import React from 'react';
import { Fragment } from 'react';
import { useEffect,useState } from 'react';
import './App.css';
import Shelf from './Comps/Shelf';
import { getAll , update } from './BooksAPI';
import Search from './Comps/Search';
import { Route ,Routes,Link } from 'react-router-dom';




function App() {
  const [books, setBooks] = useState([]);
  const changeBookShelfHandler = (newShelf, Sbook) => {
    const uppdatedBookindex = (books.findIndex(book => book.id === Sbook.id));
    
      if (uppdatedBookindex !== -1) {
        const updatededBooks = books.map(book =>
        {
        if (book.id === Sbook.id) {
        book.shelf = newShelf;
        update(book, newShelf);
        return book;
      }
      return book;
        });
      setBooks(updatededBooks);
      } else {
        Sbook.shelf = newShelf;
        update(Sbook, newShelf);
        setBooks(preState => {
          return (
            [...preState,Sbook]
          )
        })
    }
  }
  useEffect(() => {
    const getBooks = async () => {
      const books = await getAll();
      setBooks(books)
    }
    getBooks();
  }, []);
  return (
    <Fragment>
      <h2>This is My Reads Project</h2>
      <Routes>
        <Route path='/' element=
          {
           <Fragment>
          <main>
        <Shelf
        onChangeBookShelf={changeBookShelfHandler}
        shelfName='Currently Reading'
        books={books.filter(book => book.shelf==='currentlyReading')}
      ></Shelf>
      <Shelf
        onChangeBookShelf={changeBookShelfHandler}
        shelfName='Want to Read'
        books={books.filter(book => book.shelf==='wantToRead')}
      ></Shelf>
      <Shelf
        onChangeBookShelf={changeBookShelfHandler}
        shelfName='Read'
        books={books.filter(book => book.shelf==='read')}
      ></Shelf>
            </main>
            <aside>
        <div className="open-search">
              <Link to='/search'>Add a book</Link>
        </div>
      </aside>
          </Fragment>
          

        } >

        </Route>
        <Route path='/search' element={
          <Search
        books={books}
        onChangeBookShelf={changeBookShelfHandler}
          />
        }
        >

        </Route>
      </Routes>
      
      
      

      
    </Fragment>
  );
}

export default App;
