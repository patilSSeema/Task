const router = require("express").Router();
const Task = require("../Modal/TaskModel");
const User = require("../Modal/UserModel");
const authenticationToken = require("./authRoute");

//create task
router.post("/create-task", authenticationToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.headers;
    const newTask = new Task({
      title: title,
      description: description,
    });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    console.log(taskId);
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    return res.status(200).json({ message: "New Task Created " });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

//display all task api
router.get("/get-task", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    console.log(User.schema.options);

    return res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

//delete Task
router.delete("/delete-task/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

    return res.status(200).json({ message: "Task Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
});

//Update Task
router.put("/update-task/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

//update Important task
router.put("/update-imp-task/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const ImpTask = taskData.important;
    await Task.findByIdAndUpdate(id, {
      important: !ImpTask,
    });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
});

//update complete task
router.put("/update-comp-task/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const completeTask = taskData.complete;
    await Task.findByIdAndUpdate(id, {
      complete: !completeTask,
    });

    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
});

// get important task
router.get("/get-imp-task", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const impData = Data.tasks;
    return res.status(200).json({ data: impData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

// get complete task
router.get("/get-comp-task", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const compTaskData = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const compData = compTaskData.tasks;
    return res.status(200).json({ data: compData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

// get In-complete task
router.get("/get-incomp-task", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const compTaskData = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const incompData = compTaskData.tasks;
    return res.status(200).json({ data: incompData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
