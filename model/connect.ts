import mongoose from "mongoose";
import chalk from "chalk";

const DB_URL = "mongodb://localhost/testGraphQL";

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  },
  (err: any) => {
    if (err) {
      console.log(chalk.red("Mongoose connection error: " + err));
    }
    console.log(chalk.green("Mongoose connection open to " + DB_URL));
  }
);

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

export const Schema = mongoose.Schema;
