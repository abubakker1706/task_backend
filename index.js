import express from 'express';
import { connection } from './db.js';
import userRoutes from './Router/userRoute.js';
import taskRoutes from './Router/taskRoute.js';
import cors from 'cors'
const app = express();

app.use(cors())

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected My Database');
});
app.use(express.json())

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World! Connected to sql and express project');
});
app.use('/api/users', userRoutes);
app.use("/api/tasks", taskRoutes);