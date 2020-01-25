import mongoose, { Schema, Model, Document } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

interface Meta {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDoc extends Document {
  uid: Number;
  name: String;
  age: Number;
  gender: String;
  birthday: {
    year: Number;
    date: Number;
  };
  stage: String;
  favoTech: String;
  meta: Meta;
}

const ListSchema: Schema = new Schema({
  uid: { type: Number, default: 0 },
  name: { type: String, isrequired: true },
  age: { type: Number, isrequired: true },
  gender: { type: String, default: "male" },
  birthday: {
    year: { type: Number, default: 2020 },
    date: { type: Number, default: 8.26 }
  },
  stage: { type: String, default: "default" },
  favoTech: { type: String, default: "react" },
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

export const List: Model<UserDoc> = mongoose.model("List", ListSchema);
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
