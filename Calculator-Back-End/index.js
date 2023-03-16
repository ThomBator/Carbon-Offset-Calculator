import express from "express";
import formData from "./routes/formData.js";
import cors from "cors";
//Initialize App
const app = express();

//Setup cors

app.use(cors({ origin: true, credentials: true }));

//use Routes
app.use("/api/formData", formData);

//Test connection
const port = 3000;

app.get("/", (req, res) => {
  res.send(`Connected on ${port}. Use /api/formData to access routes.`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
