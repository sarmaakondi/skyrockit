const express = require("express");
const router = express.Router();

const User = require("../models/user");

// Routes
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("applications/index.ejs", {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("applications/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.id);
    res.render("applications/show.ejs", { application: application });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.id(req.params.id).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.id);
    res.render("applications/edit.ejs", { application: application });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.id);
    application.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
