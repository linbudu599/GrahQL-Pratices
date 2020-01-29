import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType
} from "graphql";

export const UserInput = new GraphQLInputObjectType({
  name: "userInput",
  fields: {
    gender: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  }
});
// 进行更新时需要传入两组输入对象类型参数，
// 一组用于找到目标，这里暂时只用name和age定位
// 一组用于更新目标，这里暂时只有name和age是必填的
export const FindBy = new GraphQLInputObjectType({
  name: "findBeforeUpdate",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  }
});
