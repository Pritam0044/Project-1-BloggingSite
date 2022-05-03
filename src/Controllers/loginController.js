const authorModel = require("../Models/authorModel");
const jwt = require("jsonwebtoken");

const authorLogin = async function (req, res) {
  try {
    let authorEmail = req.body.email;
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(req.body.email)) {
      return res
        .status(400)
        .send({ status: false, data: "Please enter the valid Email" });
    }
    let authorPassword = req.body.password;
    if (req.body.password.trim().length <= 6) {
      return res
        .status(400)
        .send({ status: false, data: "Please enter the valid Password" });
    }
    let isAuthor = await authorModel.findOne({
      email: authorEmail,
      password: authorPassword,
    });
    if (!isAuthor) {
      return res
        .status(404)
        .send({ status: false, data: "No such author exists, please enter correct credentials." });
    }
    let token = jwt.sign(
      {
        authorId: isAuthor._id.toString(),
      },
      "project-1/group-34"
    );
    // res.setHeader("x-api-key",token)
    res.status(201).send({ status: true, data: {token:token}} );
  } catch (err) {
    res.status(500).send({ status: false, data: err.message });
  }
};

module.exports.authorLogin = authorLogin;
