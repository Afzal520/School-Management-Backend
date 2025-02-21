import cron from "node-cron";
// import Notice from "../../models/notice.js";
let currentTask;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const task = async(io,noticeMessage) => {
  console.log(noticeMessage)
  const formattedDate = formatDate(new Date());
  const textMessage = `${noticeMessage} at the schedular time: ${formattedDate}`
  
  console.log(`${noticeMessage} at the scheduled time: ${formattedDate}`);
  const message = new Notice({title:textMessage})
  await message.save()
  io.emit("message",textMessage);
};

export const scheduleTask = (io, scheduleTime = "30 9 * * * *") => {
  if (currentTask) {
    currentTask.stop();
  }
  currentTask = cron.schedule(scheduleTime, () => task(io), {
    timezone: "America/New_York" // Adjust the timezone as needed
  });
};

export const updateSchedule = (io, newTime,noticeMessage) => {
  scheduleTask(io, newTime,noticeMessage);
};