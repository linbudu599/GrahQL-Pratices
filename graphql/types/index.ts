import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from "graphql";

export const BirthdayType = new GraphQLObjectType({
  name: "Birthday",
  description: "Birthday",
  fields: () => ({
    year: { type: GraphQLInt },
    date: { type: GraphQLFloat }
  })
});

export const UserType = new GraphQLObjectType({
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
