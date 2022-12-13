const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");
const authorController = require("../Controllers/authorController");
const loginController = require("../Controllers/loginController");
const auth = require("../Middlewares/auth");

router.post("/authors", authorController.createAuthor);
router.post("/CreateBlog", blogController.CreateBlog);
router.get("/blogs", auth.authentication, blogController.GetData);
router.put(
  "/blogs/:blogId",
  auth.authentication,
  auth.authorization,
  blogController.updateBlog
);
router.delete(
  "/blogs/:blogId",
  auth.authentication,
  auth.authorization,
  blogController.deleteBlog
);
router.delete("/blogs", auth.authentication, blogController.deleteQuery);
router.post("/login", loginController.authorLogin);

module.exports = router;
