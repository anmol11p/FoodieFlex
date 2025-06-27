import userModel from "../model/userSchema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "user is not created.." });
    }
    // check password is valid or not
    const passwordValid = await argon2.verify(userExist.password, password); // ✅
    if (!passwordValid) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: userExist._id,
      },
      process.env.SecretKey,
      { expiresIn: "5h" }
    );
    return res.status(200).json({ message: "Login success", token });
  } catch (error) {
    next(error);
  }
};

const signUpController = async (req, res, next) => {
  try {
    const { fullname, phone, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "user is already present make another account" });
    }

    const hashpassword = await argon2.hash(password);
    const user = new userModel({
      fullname,
      phone: Number(phone),
      email,
      password: hashpassword,
    });
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.SecretKey,
      { expiresIn: "5h" }
    );
    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    next(error);
  }
};

export { loginController, signUpController };
