import "dotenv/config";
import { startCronJobs } from "./src/services/cronServices.js"

console.log("Worker started: cron jobs running...");
startCronJobs();
