const Task = require("../model/taskmodel");
const {
  validateAddTask,
  validateUpdateTask,
  validateUpdateTaskStatus,
} = require("../service/task.service");
const ResponseHelper = require("../helper/helper");

exports.getTasks = async (req, res) => {
  const userId = req.user.userId; 
  const { search } = req.query; 

  try {
    let filter = { userId };

    if (search) {
      const searchRegex = new RegExp(search, "i"); 
      filter = {
        ...filter,
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ],
      };
    }

    const tasks = await Task.find(filter);

    if (!tasks || tasks.length === 0) {
      return ResponseHelper.response(
        res,
        false,
        null,
        "No tasks found for this user",
        404
      );
    }

    return ResponseHelper.response(res, true, tasks, "All Tasks Found", 200);
  } catch (error) {
    return ResponseHelper.response(res, false, null, error.message, 500);
  }
};
exports.getTasksById = async (req, res) => {
  const { _id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await Task.findOne({ userId, _id });

    if (!task) {
      return ResponseHelper.response(
        res,
        false,
        null,
        "No task found for this user",
        404
      );
    }

    return ResponseHelper.response(res, true, task, "Task Found", 200);
  } catch (error) {
    return ResponseHelper.response(res, false, null, error.message, 500);
  }
};

exports.createTask = async (req, res) => {
  const userId = req.user.userId;
  const { error } = validateAddTask(req.body);
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      const field = err.path[0];
      errors[field] = err.message.replace(/["]/g, "");
    });
    return ResponseHelper.response(res, false, null, errors, 400);
  }

  try {
    const { title, description, status, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      userId,
    });

    const savedTask = await newTask.save();

    return ResponseHelper.response(
      res,
      true,
      savedTask,
      "New Task Created Successfully",
      201
    );
  } catch (error) {
    return ResponseHelper.response(
      res,
      false,
      null,
      "Error creating task",
      { details: error.message },
      500
    );
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { error } = validateUpdateTaskStatus(req.body);
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      const field = err.path[0];
      errors[field] = err.message.replace(/["]/g, "");
    });
    return ResponseHelper.response(res, false, null, errors, 400);
  }

  try {
    const { _id } = req.params;
    const updateData = req.body; 
    const updatedTask = await Task.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return ResponseHelper.response(res, false, "Task not found", null, 404);
    }

    return ResponseHelper.response(
      res,
      true,
      updatedTask,
      "Task Update successfully",
      200
    );
  } catch (error) {
    return ResponseHelper.response(res, false, null, error.message, 400);
  }
};

exports.updateTask = async (req, res) => {
  const { error } = validateUpdateTask(req.body);
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      const field = err.path[0];
      errors[field] = err.message.replace(/["]/g, "");
    });
    return ResponseHelper.response(res, false, null, errors, 400);
  }

  try {
    const { _id } = req.params;
    const updateData = req.body; 
    const updatedTask = await Task.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return ResponseHelper.response(res, false, "Task not found", null, 404);
    }

    return ResponseHelper.response(
      res,
      true,
      updatedTask,
      "Task Update successfully",
      200
    );
  } catch (error) {
    return ResponseHelper.response(res, false, null, error.message, 400);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(_id);

    if (!deletedTask) {
      return ResponseHelper.response(res, false, null, "Task not found", 404);
    }

    return ResponseHelper.response(
      res,
      true,
      null,
      "Task deleted successfully",
      200
    );
  } catch (error) {
    return ResponseHelper.response(res, false, null, error.message, 500);
  }
};
