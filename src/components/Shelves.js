import React from "react";
import Shelf from "./Shelf";

//Here , i made this new Component to filter shelf into CurrentlyReading,WhatToRead and Read
//updateBookShelft : used to update the book's place on shelf after choosing another shelf from the button
const Shelves =({books , updateBookShelf}) => {

    const currentlyReading = books.filter((book)=> book.shelf === "currentlyReading");
    const whatToRead = books.filter((book)=> book.shelf === "wantToRead");
    const read = books.filter((book)=> book.shelf === "read");

    return(
        <div>
         <Shelf title="Currently Reading" books={currentlyReading} updateBookShelf={updateBookShelf} />
         <Shelf title="Want To Read" books={whatToRead} updateBookShelf={updateBookShelf}/>
         <Shelf title="Read" books={read} updateBookShelf={updateBookShelf}/>

        </div>
    )




}

export default Shelves;