import Koa from "koa";
import Router from "koa-router";
import KoaStatic from "koa-static";
import bodyParser from "koa-bodyparser";
import chalk from "chalk";
import { buildSchema } from "graphql";
import mount from "koa-mount";
import graphqlHTTP from "koa-graphql";

// import { ApolloServer, gql } from "apollo-server-koa";

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3000;

app.use(bodyParser());

router.get("/hello", (ctx, next) => {
  ctx.body = "hello world";
});

app.use(KoaStatic("./public"));
app.use(router.routes()).use(router.allowedMethods());

const schema = buildSchema(`
 type Query {
   hello: String
 }
`);
app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  )
);
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "Hello Koa & GraphQL!"
//   }
// };

// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(chalk.green(`Server Start on http://localhost:${port}`));
});
