const express = require("express");
const { getAlltasks,
    createtask,
    updateTask,
    deleteTask,
    gettaskDetails,
} = require("../controllers/taskController");

const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/tasks").get(getAlltasks);

router.route("/admin/task/new").post(isAuthenticatedUser,authorizeRoles("admin"),createtask);

router.route("/admin/task/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateTask)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteTask);

router.route("/task/:id").get(gettaskDetails);



module.exports = router;