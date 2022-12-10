import moment from 'moment';
import { BadRequest } from '../errors/bad-request';

const Project = require('../models/Project');

// @ts-ignore
exports.trackTime = async (req, res, next) => {
  try {
    const { projectID } = req.params;
    const {
      startTime,
      endTime
    } = req.body;
    const project = await Project.findById(projectID);
    if (!project) {
      return next(new BadRequest('Project Not Found'));
    }
    const milliseconds = moment()
      .millisecond(moment(endTime)
        .diff(moment(startTime)));
    project.timeLogs.push({
      startTime,
      endTime,
      timeLogged: milliseconds
    });
    await project.save();
    return res
      .status(201)
      .json({
        message: 'Time tracked.'
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};
