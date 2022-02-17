import express from "express";

const PORT = process.env.PORT || 5000;

import { registerVolunteers ,clientRegister} from "./controllers/register.js";
import { searchByCity } from "./controllers/search.js";
import {createData, getData} from "./controllers/data.js"

import usersRouter from "./routes/users.js";
import volunteersRouter from "./routes/volunteers.js";
import dataRouter from "./routes/data.js";

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/data', dataRouter);




// app.get("/api",(req,res)=>{
//   createData(req,res)
// });

// app.get("/data", (req, res) => {
//   getData(req, res);
// })

// app.get("/volunteer",(req,res)=>{
//   searchByCity(req,res)
// })

app.post("/register/volunteer", (req, res) => {
  registerVolunteers(req, res);
});

// app.post("/register/client", (req, res) => {
//   clientRegister(req, res);
// });

app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
