import { Model, Schema, model } from 'mongoose';

export interface IProject {
  /** Name of the project title */
  title: string;
  /** Name of the client to deliver this too */
  client: string;
  /** charge per hour */
  chargePerHour: number;
  /** hours spent on the project */
  hoursSpent: number;
  /** hours estimated */
  hoursEstimated: number;
  /** Created On */
  createdOn: Date;
  /** Updated On */
  updatedOn: Date;
  timeLogs: [Schema.Types.ObjectId];
}

interface ProjectModel extends Model<IProject> {
}

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    client: {
      type: String,
      required: true
    },
    chargePerHour: {
      type: Number,
      required: true
    },
    hoursSpent: {
      type: Number,
      required: true,
      default: 0
    },
    hoursEstimated: {
      type: Number
    },
    timeLogs: [
      {
        startTime: {
          required: true,
          type: Date
        },
        endTime: {
          required: true,
          type: Date
        },
        timeLogged: {
          required: true,
          type: Number
        }
      }
    ]
  }, { timestamps: true }
);

export const Project = model<IProject, ProjectModel>('Project', schema);
