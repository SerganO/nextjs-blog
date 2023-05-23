import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type FeedbackData = {
  user_id: number;
  product_id: number;
  rating: number;
  message: string;
};
export default function FeedbackForm(product_id: number) {
  const [feedBackData, setFeedbackData] = useState<FeedbackData>({
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
    console.log(rating);
    console.log(feedback.length);
    setSendEnabled(rating !== undefined && feedback.length >= 6);
    console.log(sendEnabled);
    feedBackData.rating = rating;
    feedBackData.message = feedback;
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/feedbacks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedBackData),
      });

      if (response.ok) {
        console.log("all ok");
        const responseBody = await response.json();
        console.log(responseBody);
        setFeedback("");
        setRating(undefined);
        showNotification("feedback added successfully");
        router.reload();
      } else {
        const responseBody = await response.text();
        showNotification("error:" + responseBody);
      }
    } catch (error) {
      console.error(error);
      showNotification("error:" + error);
    }
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
