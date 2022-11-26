const express = require("express");
const router = express.Router();
const User = require("../models/user");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRE_TIME = 60 * 15; // 15 minutes
const REFRESH_TOKEN_EXPIRE_TIME = 6 * 30 * 24 * 60 * 60; // 6 months
const salt = 10;

// Route for user signup
router.post("/signup", async (req, res, next) => {
  const { email, password: plainTextPassword } = req.body;
  // encrypting our password to store in database
  const password = await bcrypt.hash(plainTextPassword, salt);
  try {
    // storing our user data into database
    const user = new User({ email, password });
    await user.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({ status: "error", error: "email already in use" });
    }
    throw error;
  }
});

// Verifying user login
const verifyUserLogin = async (email, password) => {
  try {
    // const user = await User.findOne({email}).lean()
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      return { status: "error", error: "user not found" };
    }
    if (await bcrypt.compare(password, user.password)) {
      // creating a JWT token
      const accessToken = jwt.sign(
        {
          username: user.email,
          type: "user",
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRE_TIME }
      );

      const refreshToken = jwt.sign(
        {
          username: user.email,
          type: "user",
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
      );

      return { status: "ok", accessToken, refreshToken };
    }
    return { status: "error", error: "invalid password" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};

// Route for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // we made a function to verify our user login
  const response = await verifyUserLogin(email, password);
  if (response.status === "ok") {
    // storing our JWT web token as a cookie in our browser
    res.cookie("token", response.refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRE_TIME * 1000,
      httpOnly: true,
    });
    res.cookie("accessToken", response.accessToken, {
      maxAge: ACCESS_TOKEN_EXPIRE_TIME * 1000,
      httpOnly: true,
    });

    res.json({ status: "ok", token: response.accessToken });
  } else {
    res.json(response);
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("accessToken");
  res.redirect("/");
});

// Refresh Token
router.post("/refresh", (req, res) => {
  if (req.cookies?.token) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.token;

    // Verifying refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // Wrong Refresh Token
        console.log(JSON.stringify(err));
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          {
            email: decoded.email,
            type: decoded.type,
          },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
          }
        );
        res.cookie("accessToken", accessToken, {
          maxAge: ACCESS_TOKEN_EXPIRE_TIME * 1000,
          httpOnly: true,
        });
        return res.json({ accessToken });
      }
    });
  } else {
    console.log("Refresh token not found");
    return res.status(406).json({ message: "Unauthorized" });
  }
});

module.exports = router;
