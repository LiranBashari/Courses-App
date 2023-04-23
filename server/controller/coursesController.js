const Courses = require("../model/coursesModel")

module.exports.allCourses = async (req, res) => {
    try {

        console.log(req.body)
    } catch (e) {
        console.error(e);
    }
};