import { PerformanceReview } from "../models/review.model.js";
const createReview = async (req, res) => {
  // create review logic
  console.log("createreview");
  try {
    const { employee, reviewers } = req.body;

    const newReview = new PerformanceReview({
      employee,
      reviewers,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getAllReviews = async (req, res) => {
  // get all reviews logic
  try {
    const reviews = await PerformanceReview.find().populate(
      "employee reviewers feedback.reviewer"
    );
    console.log(reviews);
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};
const updateReview = async (req, res) => {
  // update review logic
  try {
    const reviewId = req.params.id;
    const { employee, reviewers } = req.body;

    const updatedReview = await PerformanceReview.findByIdAndUpdate(
      reviewId,
      { employee, reviewers },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).send({ message: "Review not found" });
    }

    res.status(200).send(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const assignReviewer = async (req, res) => {
  // assign reviewer logic
  try {
    const reviewId = req.params.id;
    const { reviewerId } = req.body;
    console.log(reviewId);
    console.log(reviewerId);

    const review = await PerformanceReview.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.reviewers.push(reviewerId);
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const submitFeedback = async (req, res) => {
  // submit feedback logic
  try {
    const reviewId = req.params.id;
    const { reviewerId, text } = req.body;
    const review = await PerformanceReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const feedback = {
      reviewer: reviewerId,
      text,
    };
    review.feedback.push(feedback);
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const reviewController = {
  createReview,
  getAllReviews,
  updateReview,
  assignReviewer,
  submitFeedback,
};
