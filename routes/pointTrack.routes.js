import express from "express"
import { createRow, getPoints, getRecords, getUserDetail } from "../controllers/pointTrack.controller.js";

const app = express.Router();

app.post("/create", createRow)
app.get("/", getRecords)
app.get("/user", getUserDetail)
app.get("/getpoints", getPoints)

export default app;