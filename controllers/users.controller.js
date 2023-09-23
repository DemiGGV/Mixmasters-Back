const fs = require("fs/promises");
const path = require("path");
const { ctrlWrap, imageResize, sendMail } = require("../helpers");
const { User } = require("../models/user.model");
const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const getCurrent = async (req, res) => {
  const { _id, name, subscription, avatarURL, email, birthdate, createdAt } =
    req.user;
  res.json({
    _id,
    name,
    email,
    birthdate,
    avatarURL,
    subscription,
    createdAt,
  });
};

const subscribeEmail = async (req, res) => {
  const { _id, email, name } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  await sendMail(email, name, _id);
  res.json({ _id, subscription });
};

const unsubscribeEmail = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { subscription: null });
  res.redirect("https://vasyl24.github.io/mixmasters/");
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
  unsubscribeEmail: ctrlWrap(unsubscribeEmail),
  updateUser: ctrlWrap(updateUser),
};
