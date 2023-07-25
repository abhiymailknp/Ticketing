import express, { Router } from 'express';

const router:Router = express.Router();

router.post('/api/users/signout',()=>{})

export{router as signoutRouter}