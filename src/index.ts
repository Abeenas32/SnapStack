import express from "express";
import cors from "cors";

const app = express();
app.get("/",(req, res) =>  {
     res.json({status: "Api running perfectly"})
});

const PORT = 8000;

app.listen(PORT, () =>  {
     console.log("Backend running in the port", PORT);
})