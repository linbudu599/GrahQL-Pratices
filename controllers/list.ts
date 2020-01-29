import mongoose from "mongoose";
import Koa from "koa";
import { List } from "../model/list";

interface ICreateOne<T = any> {
  (name: string, age: number): Promise<T>;
}

interface Fragment {
  name?: string;
  age?: number;
  new_name?: string;
  new_age?: number;
}

interface IDeleteOne<T = any> {
  (name: string, age: number): Promise<T>;
}

interface IUpdateOne<T = any> {
  (oldVal: Fragment, newVal: Fragment): Promise<T>;
}

export const createOne: ICreateOne = async (name, age) => {
  const newUser = new List({
    name,
    age
  });
  const res = await newUser.save();
  return res;
};

export const updateOne: IUpdateOne = async (
  { name, age },
  { name: new_name, age: new_age }
) => {
  const res = await List.findOneAndUpdate(
    {
      name,
      age
    },
    {
      name: new_name,
      age: new_age
    },
    {
      // return updated value
      new: true,
      // do not insert if not exist
      upsert: false
    }
  );
  return res;
};

export const readOne = async () => {
  // const saveList = await List.save();
  return "R";
};
export const readAll = async () => {
  const res = await List.find();
  return res;
};
export const deleteOne: IDeleteOne = async (name, age) => {
  const res = await List.findOneAndRemove({ name, age });
  return res;
};
