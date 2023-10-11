import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { useActions } from "src/hooks/useEntity";

type FeedbackData = {
  user_id: number;
  product_id: number;
  rating: number;
  message: string;
};

export default function FeedbackForm(product_id: number) {
  const productId = product_id;
  const [currentFeedbackData, setFeedbackData] = useState<FeedbackData>({
    rating: 0,
    message: "",
    user_id: -1,
    product_id: productId,
  });

  const { addFeedbackToProduct } = useActions<"ProductEntity">("ProductEntity");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState("");

  const [sendEnabled, setSendEnabled] = useState(false);

  const [buttonBackground, setButtonBackground] = useState("bg-gray-500");

  useEffect(() => {
    setSendEnabled(rating !== undefined && feedback.length >= 6);
    let feedbackData = currentFeedbackData;
    feedbackData.rating = rating;
    feedbackData.message = feedback;
    setFeedbackData(feedbackData);
    setButtonBackground(sendEnabled ? "bg-indigo-500" : "bg-gray-500");
  }, [rating, feedback, sendEnabled]);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let feedbackData: IFeedbackPostData = {
      userId: currentFeedbackData.user_id,
      productId: productId,
      rating: currentFeedbackData.rating,
      message: currentFeedbackData.message,
    };

    addFeedbackToProduct({ payload: { feedbackData } });
  };

  return (
    <form
      className="mt-8 rounded-md border border-gray-300 bg-white p-4"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 text-2xl font-bold">Add Feedback</h1>
      <div className="mb-4">
        <label className="block">
          Rating:
          <input
            className="w-12 rounded-md border border-gray-300 p-2"
            type="number"
            min="0"
            max="5"
            value={rating ?? ""}
            onChange={handleRatingChange}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block">
          Feedback:
          <textarea
            className="mt-2 w-full rounded-md border border-gray-300 p-2"
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </label>
      </div>
      <div className="flex justify-center">
        <button
          disabled={!sendEnabled}
          type="submit"
          className={`mx-4 my-4 h-12 w-96 rounded-lg  px-4 py-2 font-semibold text-white ${
            sendEnabled ? "hover:bg-indigo-400 " : ""
          } ${buttonBackground}`}
        >
          Send
        </button>
      </div>
    </form>
  );
}
