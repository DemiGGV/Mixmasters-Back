const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { HttpError, ctrlWrap } = require("../helpers");
const { User } = require("../models/user.model");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, birthdate, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {
    protocol: "https",
    s: "250",
    d: "wavatar",
  });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name,
      email: newUser.email,
      avatarURL,
      birthdate,
      createdAt: newUser.createdAt,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  if (user.token) throw HttpError(422, "Already logined");

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw HttpError(401, "Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  const { name, avatarURL, birthdate } = user;
  res.json({
    token,
    user: {
      name,
      email: user.email,
      avatarURL,
      birthdate,
    },
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = {
  signup: ctrlWrap(signup),
  signin: ctrlWrap(signin),
  signout: ctrlWrap(signout),
};
