import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import AddBook from "./AddBook";

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;
class BookDetails extends Component {
  displayBook() {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <p>{book.name}</p>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>{book.author.genre}</p>
        </div>
      );
    }
  }

  render() {
    console.log(this.props, "props");
    return (
      <div>
        <p>Books Details</p>
        {this.displayBook()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.authorId,
      },
    };
  },
})(BookDetails);
