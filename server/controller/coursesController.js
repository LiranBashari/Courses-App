const Courses = require("../model/coursesModel")

module.exports.allCourses = async (req, res) => {
    try {

        console.log("11111111111111111111111111111111111")
    } catch (e) {
        console.error(e);
    }
};

module.exports.addAllCourse = async (req, res) => {
    try {
        console.log("11111111111111111111111111111111111")
        res.json({status:true})
    } catch (e) {
        console.error(e);
    }
};