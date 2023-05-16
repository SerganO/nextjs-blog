import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  var firstName: string;
  var lastName: string;
  var userEmail: string;
  var password: string;
  var role: string;
  if (req.method == "POST") {
    console.log(req.body);
    let bodyString = JSON.stringify(req.body);
    console.log(bodyString);
    let bodyData = JSON.parse(bodyString);
    console.log(bodyData);
    firstName = bodyData["firstName"] as string;
    lastName = bodyData["lastName"] as string;
    userEmail = bodyData["userEmail"] as string;
    password = bodyData["password"] as string;
    role = bodyData["role"] as string;
  } else {
    firstName = req.query["fn"] as string;
    lastName = req.query["ln"] as string;
    userEmail = req.query["email"] as string;
    password = req.query["pwd"] as string;
    role = req.query["r"] as string;
  }

  if (firstName && lastName && userEmail && password && role) {
    addNewUser(
      firstName,
      lastName,
      userEmail,
      password,
      role,
      (user) => {
        console.log("all ok");
        res.status(200).json(user);
      },
      (error) => {
        console.log("error: " + error);
        res.status(400).json({ error: error });
      }
    );
  } else {
    res.status(400).json({ error: "not full data" });
  }
};

function addNewUser(
  firstName: string,
  lastName: string,
  userEmail: string,
  password: string,
  role: string,
  success: (User) => void,
  failure: (Error) => void
) {
  User.create({
    firstName: firstName,
    lastName: lastName,
    userEmail: userEmail,
    password: password,
    role: role,
  })
    .then((user) => {
      success(user);
    })
    .catch((error) => {
      failure(error);
    });
}
