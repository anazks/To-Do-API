const mongoose = require("mongoose")
const Task = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Why no task?']
    },
    date: {
        type: String,
        required: [true, 'Why no date?']
    },
    status: {
        type: Boolean,
        default:false
    },
})
module.exports = mongoose.model("Task", Task)