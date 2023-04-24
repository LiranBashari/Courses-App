const User = require("../model/userModel")
const Courses = require("../model/coursesModel");
const bcrypt = require("bcrypt");


module.exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) return res.json({status: false, msg:"Incorrect Username or Password"});
        const confirmPassword = await bcrypt.compare(password, user.password);
        if (!confirmPassword) return res.json({status: false, msg:"Incorrect Username or Password"});
        return res.json({ user, status: true});
    } catch (e) {
        console.error(e);
    }
};

module.exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        // first will check if user already exist
        const userExist = await User.findOne({username})
        if (userExist) return res.json({status: false, msg: "Username already in use"});

        // second will check if email already exist
        const emailExist = await User.findOne({email})
        if (emailExist) return res.json({status: false, msg: "Email already in use"});

        // Add to DB but with encrypt password
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            username, email, password: hashedPassword
        })
        return res.json({newUser, status:true});
    } catch (e) {
        console.error(e);
    }
};

module.exports.getUserCourses = async (req, res) => {
    try {
        const userData = req.body.userData
        // find the user and populate the courses field
        const userCourses = await User.findById(userData._id).populate('courses');
        return res.json({userCourses});
    } catch (e) {
        console.error(e);
    }
};

module.exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        return res.json({courses});
    } catch (e) {
        console.error(e);
    }
};

module.exports.addCourse = async (req, res) => {
    try {
        const {userID, name, description} = req.body;

        // check if the course exists
        const course = await Courses.findOne({name:name});
        if (course) return res.json({status: false, msg:"Course already exists"});

        // create the new course
        const newCourse = await Courses.create({name:name, description:description});

        // add the new course to the user's courses array
        const user = await User.findByIdAndUpdate(
            userID,
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        return res.json({newCourse, user, status:true});
    } catch (e) {
        console.error(e);
    }
};


