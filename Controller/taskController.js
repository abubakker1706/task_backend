

import * as taskModel from '../Model/taskModel.js';




export const createTask = (req, res) => {
    const taskData = req.body;
    const [date, time] = taskData.taskDate.split(' ');
    
    const taskDateTime = `${date} ${time}:00`;
    console.log(taskData,"taskDate",taskData.taskDate)
    taskModel.createTask({...taskData, taskDate: taskDateTime}, (error, result) => {
        if (error) {
            console.error(error,"addTask");
            res.status(500).json({ message: 'Failed to create task' });
        } else {
            res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
        }
    });
};


export const getAllTasks = (req, res) => {
    taskModel.getAllTasks((error, results) => {
        if (error) {
            res.status(500).json({ message: 'Failed to retrieve tasks' });
        } else {
          
            const formattedResults = results.map(result => ({
                ...result,
                taskDate: new Date(result.taskDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                })
            }));
            res.status(200).json(formattedResults);
        }
    });
};


export const getTaskById = (req, res) => {
    const taskId = req.params.id;
    taskModel.getTaskById(taskId, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Failed to retrieve task' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};


// export const updateTaskById = (req, res) => {
//     const taskId = req.params.id;
//     const taskData = req.body;
//     const [date, time] = taskData.taskDate.split(' ');
    
//     const taskDateTime = `${date} ${time}:00`;
//     taskModel.updateTaskById(taskId, {...taskData, taskDate: taskDateTime}, (error, result) => {
//         if (error) {
//             console.log(error,"edit task")
//             res.status(500).json({ message: 'Failed to update task' });
//         } else if (result.affectedRows === 0) {
//             res.status(404).json({ message: 'Task not found' });
//         } else {
//             res.status(200).json({ message: 'Task updated successfully' });
//         }
//     });
// };
// export const updateTaskById = (req, res) => {
//     const taskId = req.params.id;
//     const taskData = req.body;
    
//     // Splitting date and time from the taskDate string
//     const [datePart, timePart] = taskData.taskDate.split(', ');
//     const [month, day, year] = datePart.split('/');
//     const [hour, minute] = timePart.split(':');
//     // Formatting taskDate in the format 'YYYY-MM-DD HH:MM:SS'
//     const formattedTaskDate = `${year}-${month}-${day} ${hour}:${minute}:00`;

//     const taskDateTime = formattedTaskDate;
//     taskModel.updateTaskById(taskId, {...taskData, taskDate: taskDateTime}, (error, result) => {
//         if (error) {
//             console.log(error,"edit task")
//             res.status(500).json({ message: 'Failed to update task' });
//         } else if (result.affectedRows === 0) {
//             res.status(404).json({ message: 'Task not found' });
//         } else {
//             res.status(200).json({ message: 'Task updated successfully' });
//         }
//     });
// };


export const updateTaskById = (req, res) => {
    const taskId = req.params.id;
    const taskData = req.body;
    
    
    let formattedTaskDate;
    if (taskData.taskDate.includes('/')) {
   
        const [datePart, timePart] = taskData.taskDate.split(', ');
        const [month, day, year] = datePart.split('/');
        const [hour, minute] = timePart.split(':');
    
        formattedTaskDate = `${year}-${month}-${day} ${hour}:${minute}:00`;
    } else {
       
        formattedTaskDate = taskData.taskDate;
    }

    const taskDateTime = formattedTaskDate;
    taskModel.updateTaskById(taskId, {...taskData, taskDate: taskDateTime}, (error, result) => {
        if (error) {
            console.log(error,"edit task")
            res.status(500).json({ message: 'Failed to update task' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task updated successfully' });
        }
    });
};


export const deleteTaskById = (req, res) => {
    const taskId = req.params.id;
    taskModel.deleteTaskById(taskId, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Failed to delete task' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    });
};

