var express = require("express");
var router = express.Router();
const postModel = require("./posts");
const UserModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
const multer = require("multer");
const upload = require("./multer");
const { response } = require("../app");
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
multer;
router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});
router.get("/feed", function (req, res, next) {
  res.render("feed");
});

router.post(
  "/upload",
  isLoggedIn,
  upload.single("file"),
  async function (req, res, next) {
    if (!req.file) {
      return res.status(404).send("no file were uploaded");
    }
    const user = await UserModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      image: req.file.filename,
      imagetext: req.body.filecaption,
      user: user._id,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  }
);

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await UserModel.findOne({
    username: req.session.passport.user,
  }).populate("posts");
  res.render("profile", { user });
});

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new UserModel({ username, email, fullname });

  UserModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
