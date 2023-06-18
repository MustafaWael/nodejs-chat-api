import { Router } from 'express';
import {
  deleteUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  loginHandler,
  logoutAllSessionsHandler,
  logoutHandler,
  resetPasswordHandler,
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

router.post('/users/forgot-password', forgotPasswordHandler);

router.post('/users/reset-password', resetPasswordHandler);

export default router;
