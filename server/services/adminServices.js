const { default: mongoose } = require("mongoose");
const ClassModal = require("../model/ClassModal");
const courseModel = require("../model/courseModel");
const userModel = require("../model/userModel");

module.exports = {
  addCourse: (data) => {
    return new Promise((resolve, reject) => {
      new courseModel(data)
        .save()
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    });
  },
  getCourses: () => {
    return new Promise((resolve, reject) => {
      courseModel
        .find({})
        .sort({ createdAt: -1 })
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    });
  },
  removeCourse: (_id) => {
    return new Promise((resolve, reject) => {
      courseModel
        .findOneAndRemove({ _id })
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    });
  },
  courseExits: (name) => {
    return new Promise((resolve, reject) => {
      courseModel
        .findOne({ name })
        .then((val) => resolve(val))
        .catch((err) => reject(err));
    });
  },
  getApplicants: () => {
    return new Promise((resolve, reject) => {
      userModel
        .aggregate([
          //   { $match: { _id: mongoose.Types.ObjectId(_id) } },
          { $match: {} },
          {
            $lookup: {
              localField: "course",
              from: "courses",
              foreignField: "_id",
              as: "courseDetails",
            },
          },
          { $unwind: "$courseDetails" },
        ])
        .then(resolve)
        .catch((error) => reject(error));
    });
  },
  approveUser: (_id) => {
    return new Promise((resolve, reject) => {
      userModel
        .updateOne({ _id }, { $set: { approved: true } })
        .then(resolve)
        .catch(reject);
    });
  },
  // class
  addClass: (course, title, date, description) => {
    return new Promise((resolve, reject) => {
      new ClassModal({ title, description, date, course })
        .save()
        .then(resolve)
        .catch(reject);
    });
  },
  getClasses: () => {
    return new Promise((resolve, reject) => {
      ClassModal.aggregate([
        { $match: {} },
        {
          $lookup: {
            localField: "course",
            from: "courses",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $project: {
            title: 1,
            course: "$courseDetails.name",
            date: 1,
            description: 1,
            courseId: "$course",
          },
        },
      ])
        .then(resolve)
        .catch((error) => reject(error));
    });
  },
  getBookedCalsses: () => {
    return new Promise((resolve, reject) => {
      ClassModal.aggregate([
        { $match: {} },
        {$unwind:'$users'},
        {
          $lookup: {
            localField: "course",
            from: "courses",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $lookup: {
            localField: "users",
            from: "users",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $project: {
            title: 1,
            course: "$courseDetails.name",
            date: 1,
            description: 1,
            courseId: "$course",
            userName:'$userDetails.name',
            email:'$userDetails.email'
          },
        },
      ])
        .then(resolve)
        .catch((error) => reject(error));
    });
  },
};
