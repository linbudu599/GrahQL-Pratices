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
import { readAll, createOne, updateOne, deleteOne } from "../controllers/list";
import { List } from "../model/list";

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
    birthday: { type: BirthdayType },
    status: { type: GraphQLString }
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
        return readAll();
      }
    }
  }
});

// 进行更新时需要传入两组输入对象类型参数，
// 一组用于找到目标，这里暂时只用name和age定位
// 一组用于更新目标，这里暂时只有name和age是必填的
const FindBy = new GraphQLInputObjectType({
  name: "findBeforeUpdate",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const NewInfo = new GraphQLInputObjectType({
  name: "infoToBeUpdated",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
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
        return createOne(name, age);
      }
    },
    // 根据第一组参数获取到一个结果，并根据第二组参数进行更新
    updateUser: {
      type: UserType,
      args: {
        findBy: {
          type: new GraphQLNonNull(FindBy)
        },
        newInfo: {
          type: new GraphQLNonNull(NewInfo)
        }
      },
      resolve: async (parentValue, { findBy, newInfo }) => {
        return updateOne(findBy, newInfo);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: async (parentValue, { name, age }) => {
        return deleteOne(name, age);
      }
    }
  })
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
