import React from 'react';
import { Fragment } from 'react';
import { useEffect,useState } from 'react';
import './App.css';
import Shelf from './Comps/Shelf';
import { getAll , update } from './BooksAPI';
import Search from './Comps/Search';
import { Route, Routes, Link } from 'react-router-dom';
const shelves = [
  {
    id: 'CR',
    title: 'Currently Reading',
    filter:'currentlyReading'

  },
  {
    id: 'WR',
    title: 'Want to Read',
    filter:'wantToRead'

  },
  {
    id: 'AR',
    title: 'Read',
    filter:'read'

  }
]




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
              {
                shelves.map(shelf => (
                  <Shelf
                    key={shelf.id}
                    onChangeBookShelf={changeBookShelfHandler}
                    shelfName={shelf.title}
                    books={books.filter(book => book.shelf===shelf.filter)}
                  />
                ))
              }
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
