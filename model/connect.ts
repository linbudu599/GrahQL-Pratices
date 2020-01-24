import mongoose from "mongoose";
import chalk from "chalk";

const DB_URL = "mongodb://localhost/testGraphQL";

const connect = () => {
  mongoose.connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true
    },
    (err: any) => {
      if (err) {
        console.log(chalk.red("Mongoose Connection Error: " + err));
      }
      console.log(chalk.green("Mongoose Connection Open To " + DB_URL));
    }
  );

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
};

export default connect;
