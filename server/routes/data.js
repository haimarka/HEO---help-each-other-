import { Router } from "express";
import { createData, getData } from "../controllers/data.js";

const router = Router();

router.get("/create", (req, res) => {
  createData(req, res);
});

router.get("/fetch", (req, res) => {
  getData(req, res);
});

export default router;
