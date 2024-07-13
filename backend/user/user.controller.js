import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  // registration logic
  const data = req.body;
  console.log(data);
  console.log("registerfn");
  try {
    const user_register = await new User(data).save();
    res.status(200).send({ msg: "user registered succesfully!!!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "something went wrong while registering user!!!!",
      err: err,
    });
  }
};

const login = async (req, res) => {
  // login logic
  const { email, password } = req.body;
  console.log(email + password);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ status: false, msg: "User not found!!!!" });
    }
    const ismatch = await user.comparePassword(password);
    if (!ismatch) {
      return res
        .status(400)
        .send({ status: false, msd: "Incorrect Password!!!!!" });
    }
    const token = jwt.sign({ user }, "employees_feedback", {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).send({
      status: true,
      msg: "login successfully!!!!!",
      token: token,
      user,
    });
  } catch (err) {
    res.status(500).send({ msg: "something went wrong while login!!!!" });
  }
};

const getAllUsers = async (req, res) => {
  // get all users logic
  console.log("getall");
  try {
    const users = await User.find({ role: "employee" }).select("-password");
    console.log(users);
    res.status(200).send({ users_data: users });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "something went wrong while fetching user data!!!" });
  }
};

const makeAdmin = async (req, res) => {
  // make admin logic
  try {
    const id = req.params.id;
    console.log(id);
    const make_admin = await User.findByIdAndUpdate(id, { role: "admin" });
    return res.status(200).send({ msg: "User Profile Updated to Admin!!!!!" });
  } catch (err) {
    res.status(500).send({
      msg: "something went wrong while making admin!!!!!",
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  // update user logic
  try {
    const id = req.params.id;
    const updated_data = req.body;
    const update_user = await User.findByIdAndUpdate(id, updated_data);
    return res
      .status(200)
      .send({ msg: "User Profile Updated Sucessfully!!!!!" });
  } catch (err) {
    res.status(500).send({
      msg: "something went wrong while Updating user data!!!!!",
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {
  // delete user logic
  try {
    const id = req.params.id;
    const delete_user = await User.findByIdAndDelete(id);
    return res.status(200).send({ msg: "deleted successfully!!!!!" });
  } catch (err) {
    res.status(500).send({
      msg: "something went wrong while deleting user data from database!!!!!!!",
      error: err,
    });
  }
};
export const userController = {
  register,
  login,
  getAllUsers,
  makeAdmin,
  updateUser,
  deleteUser,
};
