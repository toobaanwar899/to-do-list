const express = require("express");
const router = express.Router();
const authController = require("../controller/authcontroller");
const taskController = require("../controller/taskcontroller");
const { protect } = require("../middleware/auth");

router.get("/user/getAllTasks", protect, taskController.getTasks);
router.get("/user/getTaskById/:_id", protect, taskController.getTasksById);
router.post("/user/addTask", protect, taskController.createTask);
router.put("/user/updateTask/:_id", protect, taskController.updateTask);
router.put(
  "/user/updateTaskStatus/:_id",
  protect,
  taskController.updateTaskStatus
);
router.delete("/user/DeleteTasks/:_id", protect, taskController.deleteTask);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/user", protect, authController.getUser);

module.exports = router;
