import { Router } from "express";
import {
  registerVolunteers,
  searchVolunteer,
} from "../controllers/volunteers.js";

const router = Router();

router.post("/register", (req, res) => {
  registerVolunteers(req, res);
});

router.get("/volunteer", (req, res) => {
  searchVolunteer(req, res);
});

export default router;
