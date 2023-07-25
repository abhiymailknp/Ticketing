import express, { Router } from 'express';

const router:Router = express.Router();

router.get('/api/users/currentUser',(req,res)=>{
    res.send('Hi ');
})

export{router as currentUserRouter}
