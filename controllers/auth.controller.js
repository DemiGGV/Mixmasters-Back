const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { HttpError, ctrlWrap } = require("../helpers");
const { User } = require("../models/user.model");

const { SECRET_KEY } = process.env;
const TOKENEXPIRE = "2d";

const signup = async (req, res) => {
  const { name, email, birthdate, password } = req.body;

  // checking if user exist
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");

  // create user
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKENEXPIRE });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      _id: newUser._id,
      name,
      email,
      birthdate,
      avatarURL,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // checking if user exist
  if (!user) throw HttpError(401, "Email is wrong");

  // checking user password
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw HttpError(401, "Password is wrong");

  // checking if user token expired
  jwt.verify(user.token, SECRET_KEY, (err, decoded) => {
    if (err?.message === "jwt expired") {
      user.token = null;
    }
  });

  // checking if user logined
  if (user.token) throw HttpError(422, "Already logined");

  // create jwt token and login user
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKENEXPIRE });
  await User.findByIdAndUpdate(user._id, { token });
  const { _id, subscription, name, avatarURL, birthdate, createdAt } = user;

  res.json({
    token,
    user: {
      _id,
      name,
      email,
      birthdate,
      avatarURL,
      subscription,
      createdAt,
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
