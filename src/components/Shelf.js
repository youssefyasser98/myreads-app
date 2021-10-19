import React from "react";
import Book from "./Book";

//Component to illustrate what books are on each shelf details
//changeBookShelf : to update the books on each shelf after changing the book's shelf
const Shelf = ({books,title , updateBookShelf}) => {
 
    return (

         <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                          {books.map(b => (
                              <li key={b.id}>
                                  <Book book={b} changeBookShelf={updateBookShelf}/>
                              </li>
                          ))}
            
                    </ol>
                  </div>
                </div>
    )



}

export default Shelf;