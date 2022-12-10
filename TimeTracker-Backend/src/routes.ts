import { Router } from 'express';
import swaggerDocument from '../swagger.json';

const swaggerUi = require('swagger-ui-express');

const ProjectController = require('./controllers/projectController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/authController');
const isAuth = require('./middleware/authMiddleware');
const validate = require('./middleware/validate');
const { ValidateAddUser } = require('./middleware/validatiors/userValidators');
const { trackTime } = require('./middleware/validatiors/timeTrackerValidators');
const {
  ValidateAddProject,
  ValidatePatchProject
} = require('./middleware/validatiors/userValidators');

export const router = Router();
// Auth routes
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.refreshToken);
router.post('/register', AuthController.registerUser);

// Project routes
router.get('/project', isAuth, ProjectController.getProjects);
router.post('/project/create', isAuth, ProjectController.createProject);
router.patch('/project/:projectID/update', isAuth, ProjectController.updateProject);
router.delete('/project/:projectID/delete', isAuth, ProjectController.deleteProject);

// time tracking routes
router.patch('/track/:projectID', isAuth, ProjectController.createProject);

// User routes
router.get('/user/all', isAuth, UserController.getAllUsers);

if (process.env.NODE_ENV === 'development') {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
