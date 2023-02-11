const userServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const basicConfig = require("../config/basicConfig");
const { getCourseList } = require("../services/userServices");

module.exports = {
  registerUser: async (req, res) => {
    try {
      let { name, email, password, course } = req.body;
      let isUserexists = await userServices.getUserByUserEmail(email);

      // send error if user exists
      if (isUserexists)
        return res.json({
          status: false,
          message: "This Email Already taken by other user",
        });

      // encrypt password
      password = await bcrypt.hash(password, 10);
      let user = await userServices.saveUser({ name, email, password, course });

      const acces_tocken = createAccessToken({
        name: user.fullname,
        id: user._id,
      });
      const refresh_tocken = createRefreshToken({
        name: user.fullname,
        id: user._id,
      });

      res.cookie("refreshtoken", refresh_tocken, {
        httpOnly: true,
        path: "/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        status: true,
        message: "User created",
        acces_tocken,
        user: { ...user._doc, password: "" },
      });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await userServices.getUserByUserEmail(email);
      if (!user)
        return res.json({
          status: false,
          message: "You don't have account",
        });

      if (!user.approved) {
        return res.json({
          status: false,
          message: "Admin did not approved your registration",
        });
      }

      let passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.json({ status: false, message: "Incorrect Password" });

      const acces_tocken = createAccessToken({
        name: user.name,
        id: user._id,
      });
      const refresh_tocken = createRefreshToken({
        name: user.fullname,
        id: user._id,
      });

      res.cookie("refreshtoken", refresh_tocken, {
        httpOnly: true,
        path: "/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        status: true,
        message: "Login Success",
        acces_tocken,
        user: { ...user, password: "" },
        // refresh_tocken
      });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/refresh_token" });
      res.json({ status: true, message: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  generateAcceTocken: async (req, res) => {
    try {
      let refresToken = req.cookies.refreshtoken;
      if (!refresToken)
        return res.json({ status: false, message: "Please Login" });
      jwt.verify(
        refresToken,
        basicConfig.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res
              .status(400)
              .json({ status: false, messate: "Please login" });
          let user = await userServices.getUserByUserId(result.id);

          if (!user)
            return res.json({ status: true, message: "Tocken not valied" });
          const acces_tocken = createAccessToken({
            name: user.fullname,
            id: user._id,
          });

          res.json({
            status: true,
            acces_tocken,
            user,
          });
        }
      );
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
  getCoursesList: async (req, res) => {
    try {
      let courses = await getCourseList();
      res.json({ status: true, courses });
    } catch (error) {
      return res.json({ status: false, message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, basicConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, basicConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
