import Project from "../models/Project.js";

export const createProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectName } = req.body;

    if (!projectName) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = new Project({
      name: projectName,
      userId,
    });

    await project.save();

    return res.status(201).json({
      message: "Project created successfully",
      projectId: project._id,
    });
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({ userId });

    return res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
