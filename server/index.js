import express from "express";

const PORT = process.env.PORT || 5000;

import usersRouter from "./routes/users.js";
import volunteersRouter from "./routes/volunteers.js";
import dataRouter from "./routes/data.js";

const app = express();
app.use(express.json());



app.use('/api/users', usersRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/data', dataRouter);


app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
