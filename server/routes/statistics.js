import { Router } from "express";
import {
  getLeadingCityOfVolunteers,
  getLeadingCityOfUsers,
} from "../controllers/statistics.js";

const router = Router();

router.get("/volunteer/city", (req, res) => {
  getLeadingCityOfVolunteers(req, res);
});

router.get("/user/city", (req, res) => {
  getLeadingCityOfUsers(req, res);
});

export default router;
