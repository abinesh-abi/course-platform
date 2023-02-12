const { getApplicants, approveUser } = require("../services/adminServices");
const adminServices = require("../services/adminServices");

module.exports = {
  addCourse: async (req, res) => {
    try {
      let { body } = req;
      let coursExits = await adminServices.courseExits(body.name);
      if (coursExits)
        return res.json({
          status: false,
          message: "This course is already exits",
        });
      let course = await adminServices.addCourse(body);
      res.json({ status: true, course });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
  getCourses: async (req, res) => {
    try {
      let courses = await adminServices.getCourses();
      res.json(courses);
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
  removeCourse: async (req, res) => {
    try {
      let id = req.params.id;
      let courses = await adminServices.removeCourse(id);
      res.json(courses);
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },

  // applicats
  getApplicants: async (req, res) => {
    try {
      let applicants = await getApplicants();
      res.json({ status: true, users: applicants });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
  approveUser: async (req, res) => {
    try {
      const id = req.params.id;
      const approved = await approveUser(id);
      res.json({ status: true, data: approved });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
  // classes

  addClass: async (req, res) => {
    try {
      let { course, date, title, description } = req.body;
      let calss = await adminServices.addClass(
        course,
        title,
        date,
        description
      );
      res.json({ status: true, calss });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
};
