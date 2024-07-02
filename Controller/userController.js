
import * as userModel from '../Model/userModel.js';


export const createUser = (req, res) => {
    const userData = req.body;
    userModel.createUser(userData, (error, result) => {
        if (error) {
            console.log(error,"createUser error");
            res.status(500).json({ message: 'Failed to create user' });
        } else {
            res.status(201).json({ message: 'User created successfully' });
        }
    });
};


export const getAllUsers = (req, res) => {
    userModel.getAllUsers((error, results) => {
        if (error) {
            res.status(500).json({ message: 'Failed to fetch users' });
        } else {
            res.status(200).json(results);
        }
    });
};


export const getUserById = (req, res) => {
    const userId = req.params.id;
    userModel.getUserById(userId, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Failed to fetch user' });
        } else if (!result[0]) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};
const getDatePortion = (isoDateString) => {
    return isoDateString.split('T')[0];
};

export const updateUserById = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    userData.dob = getDatePortion(userData.dob);
    userModel.updateUserById(userId, userData, (error, result) => {
        if (error) {
            console.log(error,"updateUserById error");
            res.status(500).json({ message: 'Failed to update user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    });
};


export const deleteUserById = (req, res) => {
    const userId = req.params.id;
    userModel.deleteUserById(userId, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Failed to delete user' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
};
