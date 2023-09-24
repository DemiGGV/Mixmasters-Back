const fs = require("fs/promises");
const path = require("path");
const { ctrlWrap, imageResize, sendMail } = require("../helpers");
const { User } = require("../models/user.model");
const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const getCurrent = async (req, res) => {
  const {
    _id,
    name,
    subscription,
    avatarURL,
    email,
    birthdate,
    isAdult,
    createdAt,
  } = req.user;

  res.json({
    _id,
    name,
    email,
    birthdate,
    isAdult,
    avatarURL,
    subscription,
    createdAt,
  });
};

const subscribeEmail = async (req, res) => {
  const { _id, name } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  await sendMail(subscription, name, _id);
  res.json({ _id, subscription });
};

const unsubscribeEmail = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { subscription: null });
  res.redirect("https://vasyl24.github.io/mixmasters/");
};

const updateUser = async (req, res) => {
  let { _id, avatarURL } = req.user;
  let { name } = req.body;
  if (!name) {
    name = req.user.name;
  }
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    await imageResize(tempUpload);
    const newFileName = `${_id}.${originalname.split(".").pop()}`;
    const avatarUploadPath = path.join(avatarsPath, newFileName);
    await fs.rename(tempUpload, avatarUploadPath);
    avatarURL = path.join("avatars", newFileName);
  }
  await User.findByIdAndUpdate(_id, { name, avatarURL });
  res.json({ name, avatarURL });
};

module.exports = {
  getCurrent: ctrlWrap(getCurrent),
  subscribeEmail: ctrlWrap(subscribeEmail),
  unsubscribeEmail: ctrlWrap(unsubscribeEmail),
  updateUser: ctrlWrap(updateUser),
};
