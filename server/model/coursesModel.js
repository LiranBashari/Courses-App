const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    }
});

const CoursesModel = mongoose.model('Courses', coursesSchema);

module.exports = CoursesModel;
