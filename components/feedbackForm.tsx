import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { addFeedback, removeFeedback } from "../store/actionCreators"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type FeedbackData = {
  user_id: number;
  product_id: number;
  rating: number;
  message: string;
};

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default function FeedbackForm(product_id: number) {
  const [currentFeedbackData, setFeedbackData] = useState<FeedbackData>({
    rating: 0,
    message: "",
    user_id: 51,
    product_id: product_id,
  });

  const router = useRouter();
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState("");

  const [sendEnabled, setSendEnabled] = useState(false);

  const [buttonBackground, setButtonBackground] = useState("bg-gray-500");

  useEffect(() => {
    console.log("rating: ", rating);
    console.log("message lenght: ", feedback.length);
    setSendEnabled(rating !== undefined && feedback.length >= 6);
    console.log("sendEnabled: ", sendEnabled);
    let feedbackData = currentFeedbackData
    feedbackData.rating = rating;
    feedbackData.message = feedback;
    setFeedbackData(feedbackData)
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

  function showNotification(message: string) {
    window.alert(message);
  }

  const dispatch: Dispatch<any> = useDispatch()

  const saveFeedback = React.useCallback(
    (feedback: IFeedbackPostData, success, failure) => dispatch(addFeedback(feedback, success, failure)),
    [dispatch]
  )



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    let feedbackData: IFeedbackPostData = {
      user_id: currentFeedbackData.user_id,
      product_id: currentFeedbackData.product_id,
      rating: currentFeedbackData.rating,
      message: currentFeedbackData.message
  }

  saveFeedback(feedbackData, (data) => {
    console.log("responseBody: ", data);
    setFeedback("");
    setRating(undefined);
    showNotification("Feedback added successfully");
    router.reload();
  }, showNotification)



    /*xfetch(
      `/api/feedbacks/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentFeedbackData),
      },
      (data) => {
        console.log("responseBody: ", data);
        setFeedback("");
        setRating(undefined);
        showNotification("Feedback added successfully");
        router.reload();
      }
    );*/
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
