import Collection from "../models/Collection.js";
import Project from "../models/Project.js";

export const createCollection = async (req, res, next) => {
  try {
    const { collectionName } = req.body;
    const projectId = req.params.projectId;

    if (!collectionName) {
      return res.status(400).json({
        message: "collection name is required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project || project.userId.toString() !== req.user.id) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const collection = new Collection({
      name: collectionName,
      projectId: projectId,
    });

    await collection.save();

    return res.status(201).json({
      message: "collection is created successfully",
      collectionId: collection._id,
    });
  } catch (err) {
    next(err);
  }
};
