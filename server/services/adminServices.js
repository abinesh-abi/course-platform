const { default: mongoose } = require("mongoose");
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
  addClass: (_id, title, date, description) => {
    return new Promise((resolve, reject) => {
      courseModel
        .updateOne(
          { _id: mongoose.Types.ObjectId(_id) },
          { $push: { classes: { title, date, description } } }
        )
        .then(resolve)
        .catch(reject);
    });
  },
  getClasses: () => {
    return new Promise((resolve, reject) => {
      courseModel
        .aggregate([
          { $match: {} },
          {$unwind:'$classes'},
          {$project:{
            name:'$classes.title',
            course:'$name',
            date:"$classes.date",
            description:'$classes.description'
          }}
        ])
        .then(resolve)
        .catch((error) => reject(error));
    });
  },
};
