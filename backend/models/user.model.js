import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["employee", "admin"], default: "employee" },
});
// pre-hook to hash password.....
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(this.password, salt);
    this.password = hashedpass;
    next();
  } catch (err) {
    next(err);
  }
});
// Method to compare passwords.....
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
export const User = mongoose.model("User", userSchema);
