import { useRouter } from "next/router";
import Image from "next/image";

import Feedback from "../server/models/Feedback";
import Star from "./star";

export default function FeedbackView(feedback: Feedback) {
  const router = useRouter();
  const fullname = `${feedback.author.firstName} ${feedback.author.lastName}`;

  const goToUserPage = () => {
    router.push(`/users/${feedback.author.id}`);
  };

  return (
    <div
      key={feedback.id}
      className="my-4 flex rounded-lg bg-white px-4 py-3 shadow-lg"
    >
      <div className="h-15 w-15 shrink-0">
        <button onClick={goToUserPage}>
          <img
            className="mt-2 h-15 w-15 content-start rounded-full object-cover shadow-md"
            src="https://cdn-icons-png.flaticon.com/512/236/236832.png?w=740&t=st=1684484148~exp=1684484748~hmac=76a8fdbb5201abe34f6169c8fcdd2993f7ef81e883b909ce225263ad4d9b1df1"
            alt={fullname}
          />
        </button>
      </div>
      <div className="ml-4 flex-1">
        <h4 className="mt-1 text-lg font-semibold text-gray-900">{fullname}</h4>
        <h6 className="mb-3 mt-1">{feedback.message}</h6>

        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            <span className="mr-2 text-sm">{feedback.rating}</span>
            {Array.from({ length: feedback.rating }).map((_, index) =>
              Star(true)
            )}
            {Array.from({ length: 5 - feedback.rating }).map((_, index) =>
              Star(false)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
