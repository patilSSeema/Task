const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Modal/UserModel");

//Register Route
router.post("/signin", async (req, res) => {
  try {
    const { username, email } = req.body;
    const ExistingUser = await User.findOne({ username: username });
    const ExistingEmail = await User.findOne({ email: email });

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "userName is required" });
    }

    if (ExistingUser) {
      return res.status(400).json({ message: "user name already exist" });
    } else if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "username has atleast 5 Letters" });
    }

    if (ExistingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "New User Created " });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error" });
  }
});

//login Route

router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  const ExistingUser = await User.findOne({ username: username });
  if (!ExistingUser)
    return res
      .status(400)
      .json({ message: "username and password Not correct" });

  bcrypt.compare(password, ExistingUser.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "seema") }];
      const token = jwt.sign({ authClaims }, "seema", { expiresIn: "2d" });
      res.status(200).json({ id: ExistingUser._id, token: token });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  });
});
module.exports = router;
