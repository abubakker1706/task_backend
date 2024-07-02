import {connection} from '../db.js';

export const createTask = (taskData, callback) => {
    const sql = 'INSERT INTO task (task, description, assignTo, taskDate) VALUES (?, ?, ?, ?)';
    connection.query(sql, [taskData.task, taskData.description, taskData.assignTo, taskData.taskDate], callback);
};

export const getAllTasks = (callback) => {
    const sql = `
    SELECT 
        task.task_id,
        task.task,
        task.description,
        task.taskDate,
        task.assignTo,
        user.user_id,
        user.email,
        user.firstName,
        user.lastName

    FROM task
    JOIN user ON task.assignTo = user.user_id
`;
    connection.query(sql, callback);
};

export const getTaskById = (taskId, callback) => {
    const sql = 'SELECT * FROM task WHERE task_id = ?';
    connection.query(sql, [taskId], callback);
};

export const updateTaskById = (taskId, taskData, callback) => {
    const sql = 'UPDATE task SET task = ?, description = ?, assignTo = ?, taskDate = ? WHERE task_id = ?';
    connection.query(sql, [taskData.task, taskData.description, taskData.assignTo, taskData.taskDate, taskId], callback);
};

export const deleteTaskById = (taskId, callback) => {
    const sql = 'DELETE FROM task WHERE task_id = ?';
    connection.query(sql, [taskId], callback);
};