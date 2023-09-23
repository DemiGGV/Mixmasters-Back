const fs = require("fs/promises");
const path = require("path");
const { ctrlWrap, imageResize, sendMail } = require("../helpers");
const { User } = require("../models/user.model");
const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const getCurrent = async (req, res) => {
  const { name, subscription, avatarURL, email, birthdate } = req.user;
  res.json({
    name,
    email,
    avatarURL,
    birthdate,
    subscription,
  });
};

const subscribeEmail = async (req, res) => {
  const { _id, email, name } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  await sendMail(email, name);
  res.json({ _id, subscription });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const { path: tempUpload, originalname } = req.file;
  await imageResize(tempUpload);
  const newFileName = `${_id}_${originalname}`;
  const avatarUploadPath = path.join(avatarsPath, newFileName);
  await fs.rename(tempUpload, avatarUploadPath);

  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(_id, { name, avatarURL });
  res.json({ name, avatarURL });
};

module.exports = {
  getCurrent: ctrlWrap(getCurrent),
  subscribeEmail: ctrlWrap(subscribeEmail),
  updateUser: ctrlWrap(updateUser),
};
