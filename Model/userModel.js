
import {connection} from '../db.js';


export const createUser = (userData, callback) => {
    connection.query('INSERT INTO user SET ?', userData, callback);
};


export const getAllUsers = (callback) => {
    connection.query('SELECT * FROM user', callback);
};


export const getUserById = (userId, callback) => {
    connection.query('SELECT * FROM user WHERE user_id = ?', userId, callback);
};

export const updateUserById = (userId, userData, callback) => {
    connection.query('UPDATE user SET ? WHERE user_id = ?', [userData, userId], callback);
};


export const deleteUserById = (userId, callback) => {
    connection.query('DELETE FROM user WHERE user_id = ?', userId, callback);
};
