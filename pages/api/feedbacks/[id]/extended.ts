import FeedbackController from "server/controllers/FeedbackController";
import container from "server/di/container";

const feedbackController =
  container.resolve<FeedbackController>("FeedbackController");

export default feedbackController.handler("api/feedbacks/[id]/extended");
