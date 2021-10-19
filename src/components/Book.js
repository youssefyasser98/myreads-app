import React from "react";

//The Details of each Book to be changed forward
const Book = ({book ,  changeBookShelf}) => {


    return (

        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e)=>changeBookShelf(book,e.target.value )}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.publisher}</div>
                        </div>
    )
}
// We used defaultValue={book.shelf} to show on which Shelf the book is,when we press the button on the book's photo


export default Book;