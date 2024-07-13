import mongoose from "mongoose";
const performanceReviewSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  feedback: [
    {
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
    },
  ],
  date: { type: Date, default: Date.now },
});

export const PerformanceReview = mongoose.model(
  "PerformanceReview",
  performanceReviewSchema
);
