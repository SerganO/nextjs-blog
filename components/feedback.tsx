import Link from "next/link";
import { IFeedback } from "../server/models/Feedback";
import Star from "./star";

export default function FeedbackView({data, author}) {
  console.log("FeedbackView: ", data, author)
  const fullname = `${author.firstName} ${author.lastName}`;

  return (
    <div
      key={data.id}
      className="my-4 flex rounded-lg bg-white px-4 py-3 shadow-lg"
    >
      <div className="h-15 w-15 shrink-0">
        <Link href={`/users/${author.id}`}>
          <img
            className="mt-2 h-15 w-15 content-start rounded-full object-cover shadow-md"
            src="https://cdn-icons-png.flaticon.com/512/236/236832.png?w=740&t=st=1684484148~exp=1684484748~hmac=76a8fdbb5201abe34f6169c8fcdd2993f7ef81e883b909ce225263ad4d9b1df1"
            alt={fullname}
          />
        </Link>
      </div>
      <div className="ml-4 flex-1">
        <h4 className="mt-1 text-lg font-semibold text-gray-900">{fullname}</h4>
        <h6 className="mb-3 mt-1">{data.message}</h6>

        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            <span className="mr-2 text-sm">{data.rating}</span>
            {Array.from({ length: data.rating }).map((_, index) =>
              Star(true, index)
            )}
            {Array.from({ length: 5 - data.rating }).map((_, index) =>
              Star(false, data.rating + index)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
