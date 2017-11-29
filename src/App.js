import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import SearchBar from './SearchBar'
import { search } from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }

  moveTo = (id, new_s) => { 
    let isFind = true;
     
    this.setState(state => ({
      books: state.books.map((item) => {
        if (item.id === id) {// if the data has been loaded
          isFind = false
          item["shelf"] = new_s
          return item;
        }
        return item;
      })
    }))

    BooksAPI.update({id},new_s)
    if(isFind){
      BooksAPI.getAll().then((books) => {
        console.log(books);
        this.setState({
          books
        })
      })
    }
  }

  handleChange = (query, maxResults) => {
    this.setState({query});
    BooksAPI.search(query, maxResults).then((searchedBooks) => {
      console.log(searchedBooks);
      this.state.books.forEach((_item) =>{
        if(Object.prototype.toString.call(searchedBooks) === '[object Array]'){
          searchedBooks = searchedBooks.map((item) => {
            if (item.id === _item.id) {
              item['shelf'] = _item['shelf']
              return item
            }
            return item
          })
        }
      })
      this.setState(state => ({
        searchedBooks: searchedBooks || []
      }))
    })
  }

  render() {
    const maxResults = 20;

    return (
      <div className="app">
        <Route  path="/search" render={() => (
          <SearchBar
            onHandleChange={this.handleChange}
            books={this.state.searchedBooks}
            onMoveTO={this.moveTo}
            maxResults
          />
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookList 
                  onMoveTO={this.moveTo}
                  kind="currentlyReading" 
                  books={this.state.books.filter((item) => item.shelf === "currentlyReading")} 
                  />
                <BookList
                  onMoveTO={this.moveTo} 
                  kind="wantToRead" 
                  books={this.state.books.filter((item) => item.shelf === "wantToRead")} 
                  />
                <BookList
                  onMoveTO={this.moveTo}
                  kind="read" 
                  books={this.state.books.filter((item) => item.shelf === "read")} 
                  />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
