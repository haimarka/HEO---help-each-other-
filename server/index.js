import express from "express";

const PORT = process.env.PORT || 5000;

import usersRouter from "./routes/users.js";
import volunteersRouter from "./routes/volunteers.js";
import dataRouter from "./routes/data.js";
import statisticsRouter from "./routes/statistics.js";

const app = express();
app.use(express.json());



app.use('/api/users', usersRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/data', dataRouter);
app.use('/api/statistics', statisticsRouter);


app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
