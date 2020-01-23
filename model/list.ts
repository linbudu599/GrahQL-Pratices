import mongoose from "mongoose";
import { Schema } from "./connect";

const ObjectId = Schema.Types.ObjectId;

const ListSchema = new Schema({
  uid: Number,
  name: String,
  age: Number,
  gender: String,
  birthday: {
    year: Number,
    date: Number
  },
  stage: String,
  favoTech: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

export const List = mongoose.model("List", ListSchema);

// const group = [];

// for (let i = 0; i < 15; i++) {
//   const basic = new List({
//     uid: i,
//     name: "林不渡",
//     age: Math.floor(Math.random() * 100),
//     gender: "male",
//     birthday: {
//       year: Math.floor(Math.random() * 10000),
//       date: 8.26
//     },
//     stage: i % 2 === 0 ? "primary" : "middle",
//     favoTech: "front-end-react"
//   });
//   group.push(basic);
// }

// List.insertMany(group).then((result: any) => {
//   console.log(result);
// });
