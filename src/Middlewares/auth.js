const jwt = require("jsonwebtoken");
const authorModel = require("../Models/authorModel");
const blogModel = require("../Models/blogModel");

let authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    // console.log(token)
    // console.log(req.body.authorId)
    if (!token) {
      return res.status(401).send({ status: false, data: "Token not present" });
    }

    let decodedToken = jwt.verify(token, "project-1/group-34"); //{payload and issuedat}
    
    req.decodedToken = decodedToken; //req is our existing object{previous data , decodedtoken:{payload and issuedat}}
    next();
  } catch (err) {
    res.status(401).send({ status: false, data: "Authentication failed" });
  }
};

let authorization = async function (req, res, next) {
  try {
    decodedToken = req.decodedToken;
    blogId = req.params.blogId;
    const isvalidId = await blogModel.findOne({_id:blogId,isDeleted:false});
    if (!isvalidId) {
      return res
        .status(401)
        .send({ status: false, data: "Please enter a valid blogId" });
    }
    // console.log(isvalidId);
    let authorToBeModified = isvalidId.authorId.toString();
    let authorLoggedin = decodedToken.authorId;
    if (authorToBeModified !== authorLoggedin) {
      return res
        .status(403)
        .send({
          status: false,
          data: "Author logged is not allowed to modify the requested authors data",
        });
    }
    let author = await authorModel.findById(authorToBeModified);
    if (!author) {
      return res
        .status(404)
        .send({ status: false, data: "no such author exists" });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, data: err.message });
  }
};

module.exports.authentication = authentication;
module.exports.authorization = authorization;
