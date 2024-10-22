import express from 'express';
import { leaderboard2048, leaderboard2187, loginUser, registerUser, updateHighScore2048, updateHighScore2187 } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/highscore2048', updateHighScore2048);
userRouter.post('/highscore2187', updateHighScore2187);
userRouter.get('/leaderboard2048', leaderboard2048);
userRouter.get('/leaderboard2187', leaderboard2187);

export default userRouter;