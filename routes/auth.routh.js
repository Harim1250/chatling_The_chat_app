import express from 'express'
import { checkAuth, login, logout, Signup, updateprofile } from '../controllers/auth.controllers.js';
import {protectRoute}  from '../middlewares/auth.middlewere.js';

const router = express.Router()

router.post('/Signup',Signup)

router.post('/login',login)

router.post('/logout',logout);

router.put("/update-profile" , protectRoute , updateprofile);

router.get("/check", protectRoute , checkAuth)

export default router;