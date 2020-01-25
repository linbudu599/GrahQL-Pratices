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
  GraphQLInputType
} from "graphql";
import mongoose from "mongoose";
import { List } from "../model/list";

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
    birthday: { type: BirthdayType },
    status: { type: GraphQLString }
  })
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "root",
  description: "Root Query",
  fields: {
    getByParams: {
      type: new GraphQLList(UserType),
      args: { gender: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve: async (parentValue, { gender, age }) => {
        console.log(gender, age);
        // 处理掉没有传入的参数
        let search_params = {};
        if (!gender) {
          console.log("1");
          Object.assign({}, search_params, { gender });
        }
        if (!age) {
          Object.assign({}, search_params, { age });
        }
        console.log(search_params);
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

const UserInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: "User Input",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: new GraphQLNonNull(GraphQLString) }
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
