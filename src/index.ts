import express from "express";
import registerRouter from "./routes/register.route";
import loginRouter from "./routes/login.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.get("/",(req, res) =>  {
     res.json({status: "Api running perfectly"})
});

const PORT = 8000;
app.use("/users", registerRouter);
app.use("/users",loginRouter);

app.listen(PORT, () =>  {
     console.log("Backend running in the port", PORT);
})