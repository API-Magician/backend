import Project from "../models/Project.js";
import Collection from "../models/Collection.js";
import RequestMeta from "../models/RequestMeta.js";

export const renameRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { newName } = req.body;
    const projectId = req.params.projectId;
    const collectionId = req.params.collectionId;
    const requestId = req.params.requestId;

    if (!newName || !newName.trim()) {
      // to catch empty spaces
      return res.status(400).json({
        message: "request name is required",
      });
    }

    const project = await Project.findById(projectId);

    if (!project || project.userId.toString() !== userId) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const collection = await Collection.findById(collectionId);

    if (!collection || collection.projectId.toString() !== projectId) {
      return res.status(404).json({
        message: "Collection not found",
      });
    }

    const requestMeta = await RequestMeta.findById(requestId);

    if (!requestMeta || requestMeta.collectionId.toString() !== collectionId) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    const filter = { _id: requestId };
    const update = { name: newName.trim() };
    const updated = await RequestMeta.findOneAndUpdate(filter, update);
    if (updated)
      return res.status(200).json({
        message: "name updated successfuly",
      });
    return res.status(404).json({
      message: "something went wrong",
    });
  } catch (err) {
    next(err);
  }
};
