const express = require("express");
const { createTask,
    getAllTasks,
    getTaskDetails,
    updateTask,
    deleteTask,
    } = require("../controller/taskController");

const router = express.Router();

router.route("/task/new").post(createTask);

router.route("/tasks").get(getAllTasks);

router.route("/task/:id")
    .get(getTaskDetails)
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;