const { default: mongoose } = require("mongoose");
const ClassModal = require("../model/ClassModal");
const courseModel = require("../model/courseModel");
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
        .aggregate([
          { $match: { email } },
          {
            $lookup: {
              localField: "course",
              from: "courses",
              foreignField: "_id",
              as: "courseDetails",
            },
          },
          {
            $lookup: {
              localField: "course",
              from: "classes",
              foreignField: "course",
              as: "classes",
            },
          },
          { $unwind: "$courseDetails" },
        ])
        .then((data) => resolve(data[0]))
        .catch((error) => reject(error));
    });
  },
  getUserByUserId: (_id) => {
    return new Promise((resolve, reject) => {
      userModel
        .aggregate([
          { $match: { _id: mongoose.Types.ObjectId(_id) } },
          {
            $lookup: {
              localField: "course",
              from: "courses",
              foreignField: "_id",
              as: "courseDetails",
            },
          },
          {
            $lookup: {
              localField: "course",
              from: "classes",
              foreignField: "course",
              as: "classes",
            },
          },
          { $unwind: "$courseDetails" },
        ])
        .then((data) => resolve(data[0]))
        .catch((error) => reject(error));
    });
  },
  getCourseList: (_id) => {
    return new Promise((resolve, reject) => {
      courseModel
        .find({})
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
  bookClass: (classId, userId) => {
    return new Promise((resolve, reject) => {
      ClassModal.updateOne({ _id: classId }, { $addToSet: { users: userId } })
      userModel.updateOne({_id:userId},{$addToSet:{booked:classId}})
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },
};
