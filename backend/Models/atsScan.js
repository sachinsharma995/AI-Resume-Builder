import mongoose from "mongoose";

const atsScansSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
    },
    fileType: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    sectionScores: [
      {
        sectionName: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["ok", "warn", "error"],
          default: "ok",
        },
      },
    ],
    matchedKeywords: [
      {
        keyword: {
          type: String,
          required: true,
        },
      },
    ],
    missingKeywords: [
      {
        keyword: {
          type: String,
          required: true,
        },
      },
    ],
    suggestions: [
      {
        type: String,
      },
    ],
    extractedText: {
      type: String,
    },
    extractedData: {
      email: String,
      phone: String,
      name: String,
      skills: [String],
      experience: [String],
      education: [String],
    },
    passThreshold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
atsScansSchema.index({ userId: 1, createdAt: -1 });
atsScansSchema.index({ overallScore: -1 });

const AtsScans = mongoose.model("AtsScans", atsScansSchema);
export default AtsScans;