const {login, register, getUserCourses, getAllCourses, addCourse} = require("../controller/userController")

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register)
router.post("/allcourses", getAllCourses)
router.post("/usercourses", getUserCourses)
router.post("/addallcourse", addCourse)

module.exports = router