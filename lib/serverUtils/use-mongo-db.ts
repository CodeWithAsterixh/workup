import mongoose from "mongoose";

export default function makeUseOfMongoDb(db_name: string = "") {
  return mongoose.connection.useDb(db_name);
}