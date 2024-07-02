import express from 'express';
import * as userController from '../Controller/userController.js'

const router = express.Router();

router.post('/add-user', userController.createUser);
router.get('/get-all-user', userController.getAllUsers);
router.get('/get-user/:id', userController.getUserById);
router.put('/update-user/:id', userController.updateUserById);
router.delete('/delete-user/:id', userController.deleteUserById);

export default router;
