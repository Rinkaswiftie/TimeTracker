import { BadRequest } from '../errors/bad-request';

const Project = require('../models/Project');

exports.getProjects = async (req: any, res: any, next: any) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    const totalItems = await Project.find()
      .countDocuments();
    const projectsToDisplay = await Project.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    return res.status(200)
      .json({
        message: 'Fetched projects.',
        projectsToDisplay,
        totalItems
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProject = async (req: any, res: any, next: any) => {
  try {
    const {
      title,
      client,
      chargePerHour,
      hoursEstimated
    } = req.body;
    const project = new Project({
      title,
      client,
      chargePerHour,
      hoursEstimated,
      timeLogs: []
    });
    await project.save();
    return res.status(201)
      .json({
        message: 'Project created.',
        post: project
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProject = async (req: any, res: any, next: any) => {
  try {
    const { projectID } = req.params;
    await Project.findOneAndUpdate({ _id: projectID }, req.body);
    return res.status(200)
      .json({
        message: 'Project updated!'
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProject = async (req: any, res: any, next: any) => {
  try {
    const { projectID } = req.params;
    const project = await Project.findById(projectID);

    if (!project) {
      return next(new BadRequest('Project Not Found'));
    }
    await Project.findByIdAndRemove(projectID);
    return res.status(200)
      .json({ message: 'Deleted project.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
