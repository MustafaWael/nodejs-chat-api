import { startServer } from "./server";
import { PORT } from "./config";
import connect_db from "./database/connect";

startServer(PORT).on("listening", connect_db);
