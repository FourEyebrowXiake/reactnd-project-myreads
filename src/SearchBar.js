import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SearchBar extends Component {

    state = {
        query: ''
    }

    handleChange = (e) => {
        this.setState({query: e.target.value})
        this.props.onHandleChange(e.target.value, this.props.maxResults)
    }

    render() {
        const { books, onMoveTO  } =this.props;
        
        console.log(books);
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={this.state.query} 
                            onChange={this.handleChange} 
                            placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.length > 0 && books.map((item) => (
                            <li key={item.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" 
                                            style={{ width: 128, height: 193, 
                                                backgroundImage: `url(${item.imageLinks['thumbnail'] || item.imageLinks['smallThumbnail']})` }}>
                                        </div>
                                        <div className="book-shelf-changer">
                                            <select value={ item.shelf ? item.shelf : 'none'}
                                                onChange={(e) => onMoveTO(item.id, e.target.value)}
                                            >
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{item.title}</div>
                                    <div className="book-authors">{item.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBar;