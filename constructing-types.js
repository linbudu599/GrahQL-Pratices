const express = require("express");
const graphqlHTTP = require("express-graphql");
const {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");

const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    account: {
      type: AccountType,
      args: {
        username: { type: GraphQLString }
      },
      resolve: (_, { username }) => {
        return {
          name: username,
          age: 18
        };
      }
    }
  }
});

const schema = new GraphQLSchema({ query: queryType });
const app = express();

app.use(
  "/demo",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.use(express.static("public"));

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
