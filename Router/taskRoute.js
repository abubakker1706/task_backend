import express from 'express';
import * as taskController from '../Controller/taskController.js';

const router = express.Router();


router.post('/add-tasks', taskController.createTask);


router.get('/get-all-tasks', taskController.getAllTasks);


router.get('/get-tasks/:id', taskController.getTaskById);


router.put('/update-tasks/:id', taskController.updateTaskById);


router.delete('/delete-tasks/:id', taskController.deleteTaskById);

export default router;
