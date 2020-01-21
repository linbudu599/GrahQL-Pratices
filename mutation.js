const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  input AccountInput {
    name: String
    age: Int
  }

  type Account {
    name:String
    age: Int
  }

  type Mutation {
    createAccount(input:AccountInput): Account
    updateAccount(id: ID!,input:AccountInput): Account
  }
  type Query {
    accounts: [Account]
  }
`);

const db = {};

const root = {
  accounts: () => {
    let arr = [];
    for (const key in db) {
      arr.push[db[key]];
    }
    return [{ name: "ss", age: 1 }];
  },
  createAccount: ({ input }) => {
    db[input.name] = input;
    return db[input.name];
  },
  updateAccount: ({ id, input }) => {
    const updated = Object.assign({}, db[id], input);
    db[id] = updated;
    return updated;
  }
};

const app = express();

const auth = (req, res, next) => {
  if (
    req.url.indexOf("/demo") !== -1 &&
    req.headers.cookie.indexOf("auth") === -1
  ) {
    res.send("无权限");
    return;
  }
  next();
};

app.use(auth);

app.use(
  "/demo",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.use(express.static("public"));

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
