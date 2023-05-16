import { NextApiRequest, NextApiResponse } from "next";
import Feedback from "../../../db/models/Feedback";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId: number = parseInt(req.query["user_id"] as string);
  const productId: number = parseInt(req.query["prod_id"] as string);
  const rating: number = parseInt(req.query["r"] as string);
  const message: string = req.query["msg"] as string;

  if (userId && productId && rating && message) {
    addNewFeedback(
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
};

function addNewFeedback(
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
