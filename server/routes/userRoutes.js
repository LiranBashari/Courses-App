const {login, register, userCourses, addUserCourse} = require("../controller/userController")
const {allCourses, addAllCourse} = require("../controller/coursesController")

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register)
router.post("/allcourses", allCourses)
router.post("/usercourses", userCourses)
router.post("/addallcourse", addAllCourse)
router.post("/addusercourse", addUserCourse)


module.exports = router