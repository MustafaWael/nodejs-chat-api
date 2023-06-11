import mongoose from "mongoose";
import { MONGODB_ATLAS_URI } from "../config";

export default function connect_db() {
  mongoose.connect(MONGODB_ATLAS_URI as string, {
    dbName: "chat-app",
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error(error);
  });

  db.once("open", () => {
    console.log("Connected to database");
  });
}
