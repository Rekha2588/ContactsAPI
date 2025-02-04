const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');

connectDb();
const app = express();
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})