import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import chalk from "chalk";
import { ApolloServer, gql } from "apollo-server-koa";

import LaunchAPI from "../data";

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

// schema
const typeDefs = gql`
  type Query {
    hello: String
  }
  type Launch {
    id: ID!
    site: String
    isBooked: Boolean!
  }
`;

// resolvers
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    missionPatch: (_: any, { size }: any) => {
      console.log(size);
      return "sss";
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    launchAPI: new LaunchAPI()
  })
});
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(chalk.green(`Server Start on http://localhost:${port}`));
});
