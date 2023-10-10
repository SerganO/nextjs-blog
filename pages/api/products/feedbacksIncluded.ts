import container from "server/di/container";

export default container
  .resolve("ProductController")
  .handler("api/products/feedbacksIncluded");
