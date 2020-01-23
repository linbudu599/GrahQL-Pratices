const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// "18"可以被转为Int类型，但"18岁"不行
const schema = buildSchema(`
  type Life {
    lover: String
    work: String
  }
  type Custom {
    idx: Int
    people(count:Int!): String
  }
  type Query {
    hello: String
    name: String
    age: Int
    life: Life
    func(idx: Int!): [String]
    complex(idx: Int!): Custom
    account(username:String):Account
  }
  type Account {
    name: String
    age: Int
    salary(city:String):Int
  }
`);

const root = {
  hello: () => {
    return "Hello GraphQL";
  },
  name: () => {
    return "林不渡";
  },
  age: () => {
    return 22;
  },
  life: () => {
    return {
      lover: "茵茵",
      work: "FE-ENGINEER"
    };
  },
  func: ({ idx }) => {
    const obj = {
      0: ["idx-0"],
      1: ["idx-1"]
    };
    return obj[idx];
  },
  complex: ({ idx }) => {
    const people = ({ count }) => {
      return count === 1 ? "Yep!" : "NoNoNo~";
    };
    return { idx, people };
  },
  account: ({ username }) => {
    const salary = ({ city }) => {
      if (city !== "1") {
        return 111;
      } else {
        return 222;
      }
    };

    return {
      name: username,
      age: Math.floor(Math.random() * 10),
      salary
    };
  }
};

const app = express();

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
