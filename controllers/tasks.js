const TaskModel = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskModel.find({});
  res.status(200).json({ tasks: tasks });
  // res.status(500).json({ msg: error });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOne({ _id: taskID });

  //!404 not found error
  //if we have correct syntax for the id, but cant find them, then show this 404 not found
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ success: true, msg: "Task Deleted Successfully" });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const dataToUpdate = req.body;
  const task = await TaskModel.findOneAndUpdate({ _id: taskID }, dataToUpdate, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
});

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
