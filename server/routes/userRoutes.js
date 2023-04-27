const {login, register, getUserCourses, getAllCourses, addToAllCourses, addToUserCourses, removeFromUserCourses} = require("../controller/userController")

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register)
router.get("/allcourses", getAllCourses)
router.post("/usercourses", getUserCourses)
router.post("/addallcourse", addToAllCourses)
router.post("/addusercourse", addToUserCourses)
router.post("/removeusercourses", removeFromUserCourses)



module.exports = router