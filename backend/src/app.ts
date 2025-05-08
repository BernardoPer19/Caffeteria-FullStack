import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorhandle";
import AuthRouter from "./feature/auth/routes/public/Auth.routes";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/", AuthRouter);
app.get("/", (_req, res) => {
  res.send("hi");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
