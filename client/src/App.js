import React, {Component} from 'react';
import './App.css';
import ApolloClient from "apollo-boost"; 
import { ApolloProvider } from "react-apollo"
import BookList from './Component/BookList';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
            <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
