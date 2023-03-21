import express from "express";
import bodyParser from "body-parser";
import calculations from "../calculations.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//@route POST api/formData
//@description post form data and return graph data
//@access Public
router.post("/", async (req, res) => {
  const results = calculations(req.body);

  console.log(results);

  res.json(results);
});

//helper functions for calculations

export default router;
