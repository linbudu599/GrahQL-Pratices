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
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInterfaceType
} from "graphql";
import mongoose from "mongoose";
import { List } from "../model/list";

// const NameType = new GraphQLInterfaceType({
//   name: "userName",
//   fields: {
//     name: { type: GraphQLString }
//   }
// });

const BirthdayType = new GraphQLObjectType({
  name: "Birthday",
  description: "Birthday",
  fields: () => ({
    year: { type: GraphQLInt },
    date: { type: GraphQLFloat }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "Test User",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    birthday: { type: BirthdayType }
  })
});

const UserInput = new GraphQLInputObjectType({
  name: "userInput",
  fields: {
    gender: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "root",
  description: "Root Query",
  fields: {
    // TODO:根据传入参数个数动态变化
    getByParams: {
      type: new GraphQLList(UserType),
      // args: { gender: { type: GraphQLString }, age: { type: GraphQLInt } },
      args: {
        genderAndAge: {
          type: new GraphQLNonNull(UserInput)
        }
      },
      resolve: async (parentValue, { genderAndAge: { gender, age } }) => {
        console.log(gender, age);
        const res = await List.find({ gender, age });
        return res;
      }
    },
    getAll: {
      type: new GraphQLList(UserType),
      args: {},
      resolve: async () => {
        const res = await List.find();
        return res;
      }
    }
  }
});

const Mutation: GraphQLObjectType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root Mutation",
  fields: () => ({
    createUser: {
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
    },
    // 根据第一组参数获取到一个结果，并根据第二组参数进行更新
    updateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, { name, age }) => {
        // const res = await List.findOneAndUpdate({  });
        // console.log(res);
        // return res;
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, { name, age }) => {
        const res = await List.findOneAndRemove({ name, age });
        console.log(res);
        return res;
      }
    }
  })
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
