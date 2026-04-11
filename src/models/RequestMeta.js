import mongoose from "mongoose";

const requestMetaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },

    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    projectId: {
      // Faster queries (no need to join collection → project)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RequestMeta = mongoose.model("RequestMeta", requestMetaSchema);

export default RequestMeta;
