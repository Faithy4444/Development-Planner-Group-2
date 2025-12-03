import "dotenv/config";
import { startCronJobs } from "./services/cronServices.js"

console.log("Worker started: cron jobs running...");
startCronJobs();
