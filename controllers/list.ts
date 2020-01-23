import mongoose from "mongoose";
import Koa from "koa";
import { List } from "../model/list";

export const createOne = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const saveList = await List.save();
};
