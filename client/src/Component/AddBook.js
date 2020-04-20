import React, {Component} from 'react';
import {gql} from 'apollo-boost'
import { graphql } from "react-apollo"
import * as compose from 'lodash.flowright';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
       addBook(name: $name, genre: $genre, authorId: $authorId){
           name, 
           id
       }
    }
`

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`


class AddBook extends Component {
    state= {
        name: '',
        genre: '',
        authorId: ''
    }
    displayAuthor() {
        const data = this.props.getAuthorsQuery;
        console.log(this.props)
        if(data.loading) {
            return (<option>Looking Book..</option>)
        } else {
            return data.authors.map((author, i) => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        } 
    }

    onSubmitForm(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        })
    }

    render() {
        console.log(this.props, 'props')
        return (
            <div className="AddBook">
                <form id="add-book" onSubmit={this.onSubmitForm.bind(this)}>
                    <div className="field">
                        <label>Book Name</label>
                        <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Genre</label>
                        <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Author</label>
                       <select onChange={(e) => this.setState({authorId: e.target.value})}>
                           <option>select author</option>
                           {this.displayAuthor()}
                       </select>
                    </div>
                    <button>+</button>
                </form>
            </div>
         
      );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);
