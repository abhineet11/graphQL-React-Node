const graphql = require("graphql");
const _ = require("lodash");

const Book = require("../models/books");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// var books = [
//     {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
//     {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
//     {name: 'Name of the Wind', genre: 'Fantasy', id: '4', authorId: '1'},
//     {name: 'The Final Empire', genre: 'Fantasy', id: '5', authorId: '2'},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id: '6', authorId: '3'}
// ]

// var authors = [
//     {name: 'abhineet modi', age: 30, id: '1'},
//     {name: 'abh', age: 31, id: '2'},
//     {name: 'modi', age: 32, id: '3'}
// ]

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parents, args) {
        //return _.find(authors, {id: parents.authorId})
        return Author.findById(parents.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, args) {
        //return _.filter(books, {authorId: parents.id})
        return Book.find({ authorId: parents.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parents, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    // mutation {
    //   addAuthor(name: "abhineet", age: 24){
    //     name,
    //     genre
    //   }
    // }
    addBook: {
      type: BookType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLID },
      },
      resolve(parents, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    // mutation {
    //   addBook(name: "book test", genre: "fantasy", authorId: "5e9b2ccd0eda4fd95e9484d2"){
    //     name,
    //     genre
    //   }
    // }
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        //return _.find(authors, {id: args.id})
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, args) {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parents, args) {
        return Author.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
