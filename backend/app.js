const express = require("express");
const app = express();
require("dotenv").config();

require("./DataBaseConnection/Connection");
const userAPI = require("./routes/userRoute");
const taskAPI = require("./routes/taskRoute");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = 1000;
app.get("/", (req, res) => {
  res.json({ message: "API working!" });
});
app.use("/api/v1", userAPI);
app.use("/api/v2", taskAPI);

app.listen(PORT, () => {
  console.log("Server Started");
});
