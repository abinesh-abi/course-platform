const adminServices = require("../services/adminServices");

module.exports = {
  addCourse: async (req, res) => {
    try {
      let { body } = req;
      let coursExits = await adminServices.courseExits(body.name)
      if (coursExits)return res.json({status:false,message:'This course is already exits'})
      let course = await adminServices.addCourse(body);
      res.json({status:true,course});
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
      let id = req.params.id
      let courses = await adminServices.removeCourse(id);
      res.json(courses);
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
};
