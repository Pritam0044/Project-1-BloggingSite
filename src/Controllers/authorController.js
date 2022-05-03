const authorModel = require("../Models/authorModel");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;

    if (!data.fname) {
      return res.status(400).send({ status: false, data: "First Name is required" });
    }

    if (Object.keys(data.fname).length == 0 || data.fname.length == 0) {
      return res
        .status(400)
        .send({ status: false, data: "Enter a valid first name" });
    }
    if (!data.lname) {
      return res
        .status(400)
        .send({ status: false, data: "Last Name is required" });
    }
    if (Object.keys(data.lname).length == 0 || req.body.lname.length == 0) {
      return res
        .status(400)
        .send({ status: false, data: "Enter a valid last name" });
    }
    if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) {
      return res.status(400).send({
        status: false,
        data: "Enter a valid title 'Mr' or 'Mrs' or 'Miss' ",
      });
    }
    if (!data.email) {
      return res
        .status(400)
        .send({ status: false, data: "EmailId is required" });
    }
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email)) {
      return res
        .status(400)
        .send({ status: false, data: "Please enter a valid Email" });
    }

    let checkIfemailExist = await authorModel.find({ email: data.email });
    if (checkIfemailExist.length != 0) {
      return res
        .status(400)
        .send({ status: false, data: "email already exist" });
    }

    if (!data.password) {
      return res
        .status(400)
        .send({ status: false, data: "password is required" });
    }
    if (data.password.trim().length <= 6) {
      return res
        .status(400)
        .send({ status: false,data: "Please enter the valid Password" });
    }
    let saved = await authorModel.create(data);
    res.status(201).send({ status: true, data: saved });
  } catch (err) {
    console.log("This is the err", err.message);
    res.status(500).send({ status: false, data: err.message });
  }
};

module.exports.createAuthor = createAuthor;
