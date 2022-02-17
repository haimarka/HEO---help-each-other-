import express from "express";

const PORT = process.env.PORT || 5000;

import usersRouter from "./routes/users.js";
import volunteersRouter from "./routes/volunteers.js";
import dataRouter from "./routes/data.js";

const app = express();
app.use(express.json());


// app.get("/", (req, res) => {
//   console.log('working');
// });

app.post("/", (req, res) => {
  console.log('working post');
});
app.use('/api/users', usersRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/data', dataRouter);


<<<<<<< HEAD


// app.get("/api",(req,res)=>{
//   createData(req,res)
// });

// app.get("/api/data", (req, res) => {
//   getData(req, res);
// })

// app.get("/volunteer",(req,res)=>{
//   searchByCity(req,res)
// })

// app.post("/register/volunteer", (req, res) => {
//   registerVolunteers(req, res);
// });

// app.post("/register/client", (req, res) => {
//   clientRegister(req, res);
// });

=======
>>>>>>> 39f535425d9dc2ed351d242895374c378e474c2c
app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
