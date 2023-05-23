import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import Feedback from "../../../server/models/Feedback";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const userId: number = parseInt(req.query["user_id"] as string);
    const productId: number = parseInt(req.query["prod_id"] as string);
    const rating: number = parseInt(req.query["r"] as string);
    const message: string = req.query["msg"] as string;

    await checkAndAdd(req, res, userId, productId, rating, message);
  })
  .post(async (req, res) => {
    let bodyString = JSON.stringify(req.body);
    let bodyData = JSON.parse(bodyString);

    const userId: number = parseInt(bodyData["user_id"] as string);
    const productId: number = parseInt(bodyData["product_id"] as string);
    const rating: number = parseInt(bodyData["rating"] as string);
    const message: string = bodyData["message"] as string;

    await checkAndAdd(req, res, userId, productId, rating, message);
  });

async function checkAndAdd(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number,
  productId: number,
  rating: number,
  message: string
) {
  if (userId && productId && rating && message) {
    await addNewFeedback(
      userId,
      productId,
      rating,
      message,
      (feedback) => {
        res.status(200).json(feedback);
      },
      (error) => {
        res.status(400).send({ error: error });
      }
    );
  } else {
    res.status(400).send({ error: "not full data" });
  }
}

async function addNewFeedback(
  userId: number,
  productId: number,
  rating: number,
  message: string,
  success: (Feedback) => void,
  failure: (Error) => void
) {
  Feedback.create({
    userId: userId,
    productId: productId,
    rating: rating,
    message: message,
  })
    .then((feedback) => {
      success(feedback);
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