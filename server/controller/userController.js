const User = require("../model/userModel")
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) return res.json({status: false, msg:"Incorrect Username or Password"});
        const confirmPassword = await bcrypt.compare(password, user.password);
        if (!confirmPassword) return res.json({status: false, msg:"Incorrect Username or Password"});
        return res.json({status: true, user});
    } catch (e) {
        console.error(e);
    }
};

module.exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        console.log("the body is: " , req.body)
        // first will check if user already exist
        const userExist = await User.findOne({username})
        if (userExist) return res.json({status: false, msg: "Username already in use"});

        // second will check if email already exist
        const emailExist = await User.findOne({email})
        if (emailExist) return res.json({status: false, msg: "Email already in use"});

        // Add to DB but with encrypt password
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = User.create({
            username, email, password: hashedPassword
        })
        console.log("before ret ", newUser)
        return res.json({status:true, newUser});
    } catch (e) {
        console.error(e);
    }
};