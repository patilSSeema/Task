const router = require("express").Router();
const Task = require("../Modal/TaskModel");
const User = require("../Modal/UserModel");

router.post("/create-task", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.header;
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    return res.status(200).json({ message: "New Task Created " });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});
module.exports = router;