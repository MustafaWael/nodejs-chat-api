import { Router } from 'express';
import {
  deleteUserHandler,
  getCurrentUserHandler,
  loginHandler,
  logoutAllSessionsHandler,
  logoutHandler,
  signupHandler,
  updateUserHandler,
} from '../handlers/user';
import { auth } from '../middlewares';

const router = Router();

// TODO: handle the mongodb errors
router.post('/users/signup', signupHandler);

router.post('/users/login', loginHandler);

router.post('/users/logout', auth, logoutHandler);

router.post('/users/logoutallsesiions', auth, logoutAllSessionsHandler);

router.get('/users', auth, getCurrentUserHandler);

router.patch('/users', auth, updateUserHandler);

router.delete('/users', auth, deleteUserHandler);

export default router;
