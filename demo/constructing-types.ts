import express from "express";
import graphqlHTTP from "express-graphql";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from "graphql";

const AccountType = new GraphQLObjectType({
  name: "Account",
  description: "AccountInfo",
  fields: {
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

// 定义主干查询
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    account: {
      type: AccountType,
      args: {
        username: { type: GraphQLString, defaultValue: "Budu" }
      },
      resolve: (parentValue, { username }, request) => {
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
