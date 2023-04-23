const {login, register, userCourses} = require("../controller/userController")
const {allCourses} = require("../controller/coursesController")

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register)
router.post("/allcourses", allCourses)
router.post("/usercourses", userCourses)

module.exports = router