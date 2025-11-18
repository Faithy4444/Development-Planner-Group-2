import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000

//middleware accepts all endpoints for now
app.use(cors());
app.use(express.json());

//Temp root endpoint for testing
app.get("/", (req, res) => {
    res.json({message: `Api is running on ${PORT}`})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});