import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
  isOutputType,
  isInputType,
  GraphQLInputObjectType,
  GraphQLInputType
} from "graphql";
import mongoose from "mongoose";
import { List } from "../model/list";

// 查询 测试
const BirthdayType: GraphQLObjectType = new GraphQLObjectType({
  name: "Birthday",
  description: "Birthday",
  fields: () => ({
    year: { type: GraphQLInt },
    date: { type: GraphQLFloat }
  })
});

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  description: "Test User",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    birthday: { type: BirthdayType }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "root",
  description: "Root Query",
  fields: {
    user: {
      type: new GraphQLList(UserType),
      args: { gender: { type: GraphQLString } },
      resolve: async (parentValue, { gender }) => {
        const res = await List.find({ gender: "male" });
        return res;
      }
    }
  }
});

const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: "Mutation",
  description: "Test Mutation",
  fields: () => ({
    CUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, { name, age }) => {
        const newUser = new List({
          name,
          age
        });
        const res = await newUser.save();
        return res;
      }
    }
  })
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
