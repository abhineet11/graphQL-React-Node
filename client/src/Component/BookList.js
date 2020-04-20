import React, {Component} from 'react';
import {gql} from 'apollo-boost'
import { graphql } from "react-apollo"
import AddBook from './AddBook';
import BookDetails from './BookDetails';

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`
class BookList extends Component {
    state = {
        authorId: ''
    }
    displayBook() {
        const {data} = this.props;
        if(data.loading) {
            return (<div>Looking Book..</div>)
        } else {
            return data.books.map((book, i) => (
                <li key={book.id} onClick={(e) => this.setState({authorId: book.id})}>{book.name}</li>
            ))
        }
    }
    render() {
        console.log(this.props, 'props')
        return (
            <div className="BookList">
                <AddBook />
                <ul>
                    {this.displayBook()}
                </ul>
                <BookDetails authorId={this.state.authorId}/>
            </div>
         
      );
    }
}

export default graphql(getBooksQuery)(BookList);
