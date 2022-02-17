import { Router } from "express";
import {
  registerVolunteers,
  searchVolunteer,
  getVolunteers,
  loginVolunteers,
  getVolunteer,
} from "../controllers/volunteers.js";

const router = Router();

router.post("/register", (req, res) => {
  registerVolunteers(req, res);
});

router.post("/login", (req, res) => {
  loginVolunteers(req, res);
});

router.get("/:id", (req, res) => {
  getVolunteer(req, res);
});

router.get("/fetch", (req, res) => {
  getVolunteers(req, res);
});

router.get("/volunteer/:city/:occupation", (req, res) => {
  searchVolunteer(req, res);
});

export default router;
