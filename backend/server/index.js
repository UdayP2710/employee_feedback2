import express from "express";
import cors from "cors";
import cookie from "cookie-parser";
import { connectToDataBase } from "../db_config/mongodb.js";
import { User_router } from "../user/user.route.js";
import { Review_router } from "../review/review.route.js";
const app = express();
// const corsOptions = {
//   origin: " https://udayp2710.github.io", // Replace with your frontend URL
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };
app.use(cors());
app.use(cookie());
app.use(express.json());
app.use("/users", User_router);
app.use("/reviews", Review_router);
app.listen(6500, () => {
  console.log("server is listening at port 6500!!!!!");
  connectToDataBase();
});
