import express from "express";
import bodyParser from "body-parser";
import offsetCalculator from "../offsetCalculator.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//@route POST api/formData
//@description post form data and return graph data
//@access Public
router.post("/", async (req, res) => {
  offsetCalculator(req.body);

  res.json(req.body);
});

//helper functions for calculations

export default router;
