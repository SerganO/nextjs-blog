import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import User from "../../../server/models/User";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const firstName = req.query["fn"] as string;
    const lastName = req.query["ln"] as string;
    const userEmail = req.query["email"] as string;
    const password = req.query["pwd"] as string;
    const role = req.query["r"] as string;

    await checkAndAdd(req, res, firstName, lastName, userEmail, password, role);
  })
  .post(async (req, res) => {
    let bodyString = JSON.stringify(req.body);
    let bodyData = JSON.parse(bodyString);

    const firstName = bodyData["firstName"] as string;
    const lastName = bodyData["lastName"] as string;
    const userEmail = bodyData["userEmail"] as string;
    const password = bodyData["password"] as string;
    const role = bodyData["role"] as string;

    await checkAndAdd(req, res, firstName, lastName, userEmail, password, role);
  });

async function checkAndAdd(
  req: NextApiRequest,
  res: NextApiResponse,
  firstName: string,
  lastName: string,
  userEmail: string,
  password: string,
  role: string
) {
  if (firstName && lastName && userEmail && password && role) {
    await addNewUser(
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
}

async function addNewUser(
  firstName: string,
  lastName: string,
  userEmail: string,
  password: string,
  role: string,
  success: (User) => void,
  failure: (Error) => void
) {
  await User.create({
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

export default router.handler({
  onError: (err, req, res) => {
    const error = err as Error;
    console.error(error.stack);
    res.status(500).end(error.message);
  },
});