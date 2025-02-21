import express from "express";
import { updateSchedule } from "./schedule.controller.js";
export const updateScheduleTime = (req, res) => {
  const { newTime,noticeMessage } = req.body;
  console.log(noticeMessage)
  console.log(newTime)
  if (!newTime) {
    return res.status(400).json({ message: "New time is required" });
  }
  updateSchedule(req.io, newTime,noticeMessage);
  res.status(200).json({ message: "Schedule updated successfully" });
};

