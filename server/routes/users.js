import { Router } from "express";
import { clientRegister } from "../controllers/users.js";

const router = Router();

router.post("/register", (req, res) => {
  clientRegister(req, res);
});

export default router;
