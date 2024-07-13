import jwt from "jsonwebtoken";
export const auth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token" + token);
  if (!token) return res.status(401).send("Access denied....please Login!!!!!");

  jwt.verify(token, "employees_feedback", (err, user) => {
    if (err) return res.status(403).send("Invalid token......");
    req.user = user.user;
    next();
  });
};
