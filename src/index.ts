import express from "express";
import registerRouter from "../src/routes/register.service"
import cors from "cors";

const app = express();
app.use(express.json());
app.get("/",(req, res) =>  {
     res.json({status: "Api running perfectly"})
});

const PORT = 8000;
app.use("/users", registerRouter);

app.listen(PORT, () =>  {
     console.log("Backend running in the port", PORT);
})