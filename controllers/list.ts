import mongoose from "mongoose";
import Koa from "koa";
import { List } from "../model/list";

interface ICreateOne<T = any> {
  (): Promise<T>;
}

export const createOne: ICreateOne = async () => {
  // const saveList = await List.save();
  return "C";
};
export const updateOne = async () => {
  // const saveList = await List.save();
  return "U";
};
export const readOne = async () => {
  // const saveList = await List.save();
  return "R";
};
export const deleteOne = async () => {
  // const saveList = await List.save();
  return "D";
};
