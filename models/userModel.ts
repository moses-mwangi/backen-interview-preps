import { Schema, Model, model } from "mongoose";

interface userType {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const userSchema = new Schema<userType>({
  name: { type: String, require: true },
  email: {
    type: String,
    require: [true, "User Email is required"],
    unique: true,
    lowercase: true,
    // validate: [vali],
  },
  password: { type: String, require: [true, "User Password is required"] },
  passwordConfirm: {
    type: String,
    require: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password is not the same",
    },
  },
});

const Users: Model<userType> = model("User", userSchema);

export default Users;
