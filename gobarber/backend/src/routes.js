import { Router } from "express";
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

// ROTAS QUE PRECISAM DE AUTENTICAÇÃO
routes.use(AuthMiddleware);
routes.put("/users", UserController.update);
routes.post('/files', upload.single('file'), FileController.store);


export default routes;