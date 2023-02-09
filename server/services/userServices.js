const userModel = require("../model/userModel");

module.exports = {
  saveUser: (data) => {
    return new Promise((resolve, reject) => {
      new userModel({ ...data })
        .save()
        .then((val) => resolve(val))
        .catch((error) => reject(error));
    });
  },
  getUserByUserEmail: (email) => {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ email })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
    getUserByUserId: (_id) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({_id}).select('-password')
        .then(data=>resolve(data))
        .catch(error=>reject(error))
    });
  },
};
