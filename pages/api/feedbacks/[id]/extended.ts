import container from "server/di/container";

export default container
  .resolve("FeedbackController")
  .handler("api/feedbacks/:id/extended");
