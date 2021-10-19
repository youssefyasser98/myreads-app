import React , {useState , useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from 'react-router-dom'
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import Book from './components/Book'


//Converted the Class-Based Components to functional Component
const BooksApp =() =>  {
  
    useEffect(()=>{

       BooksAPI.getAll().then(data => 
        {
          setBooks(data)
          setMapOfIdToBooks(createMapofBooks(data))
        }
      );
    },[])
    
   /*  const initialBooks = [ 
    {id :1 , url : "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    title:"To Kill a MockingBird",author:"Harper Lee",shelf:"currentlyReading"},
    {id :2 , url:"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
    title:"Ender's Game",author:"Orson Scott Card",shelf:"currentlyReading"},
    {id :3 ,url:"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
    title:"1776",author:"David McCulliugh",shelf:"wantToRead"},
    {id :4 ,url:"http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
    title:"Harry Potter and the Sorcerer's Stone",author:"J.K. Rowling",shelf:"wantToRead"},
    {id :5 ,url:"http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
    title:"The Hobbit",author:"J.R.R. Tolkien",shelf:"read"},
    {id :6 , url:"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
    title:"Oh, the Places You'll Go!",author:"Seuss",shelf:"read"},
    {id :7 ,url:"http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
    title:"The Adventures of Tom Sawyer",author:"Mark Twain",shelf:"read"}
   ]
   */

     /* TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
    
    // const [showSearchPage, setShowSearchPage]= useState(false);
    

    //Info of Each Book available in each Section
    const [books,setBooks]= useState([])

    const [query,setQuery] = useState("");
    const [mapOfIdToBooks,setMapOfIdToBooks] = useState(new Map());

    const [searchBooks,setSearchBooks] = useState([]);
    const [mergedBooks,setMergedBooks]= useState([]);


    useEffect(() => {
//let isActive , is to remove the previous search books when i enter new letter/keyword
      let isActive = true;
      if(query){
          BooksAPI.search(query).then(data => {
            if(data.error){
              setSearchBooks([])
            }
            else {
              if(isActive){
                 setSearchBooks(data);
              }
            }
          }) 
      }
    return () => {
      isActive=false;
      setSearchBooks([])
    }

    }, [query])

    //Update books to have a shelf property so on the search page when we search for a book and see on which shelf it is , it shows correctly and not show 'none' always
    useEffect(() => {
      const combined = searchBooks.map(book => {
        if(mapOfIdToBooks.has(book.id)){
          return mapOfIdToBooks.get(book.id);
        } else{
          return book;
        }
      })
      setMergedBooks(combined);
    }, [searchBooks])

//Function used to create map of the id of Books
    const createMapofBooks = (books) => {
      const map=new Map();
      books.map(book => map.set(book.id,book));
      return map;
    }

    const updateBookShelf= (book , whereTo) => {
      const updatedBooks = books.map(b => {
        if(b.id === book.id){
         book.shelf = whereTo;
         return book; 
        }
        return b;
      })
      if(!mapOfIdToBooks.has(book.id)){
        book.shelf = whereTo;
        updatedBooks.push(book)
      }
      setBooks(updatedBooks);
      //To update the book after finding it on search page to it's new Shelf it's on,on the main page
      BooksAPI.update(book,whereTo);
    }

    return (
      <div className="app">
        <Router>
          <Switch>
            
        {/*SEARCH */}
          <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
               <button className="close-search">Close</button>
               </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e)=> setQuery(e.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {mergedBooks.map(b => (
                              <li key={b.id}>
                                  <Book book={b} changeBookShelf={updateBookShelf}/>
                              </li>
                          ))}
              </ol>
            </div>
          </div>
          </Route>
        {/*Main Page */}
          <Route path="/">
          <div className="list-books">
            <Header/>
            <div className="list-books-content">
              <Shelves books={books} updateBookShelf={updateBookShelf} />
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
               </Link>
            </div>
          </div>
        </Route>
       </Switch>
      </Router>
      </div>
    )

        }

export default BooksApp
