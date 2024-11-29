const mongoose = require("mongoose");

const Connection = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://seema123:seema123@cluster0.qzhas.mongodb.net/TaskMAssign"
    );
    if (response) console.log("connected to the Database");
  } catch (error) {
    console.log(error);
  }
};
Connection();
