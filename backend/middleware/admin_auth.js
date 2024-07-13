export const admin = (req, res, next) => {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(401).send({
      msg: "unathourised user....only admin can access these settings!!!!!!",
    });
  }
  next();
};
