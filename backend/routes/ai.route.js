import express from "express";
import { response } from "../controller/ai.controller.js";
const router=express.Router({ mergeParams: true })

router.post("/get-response",response)


export{router}