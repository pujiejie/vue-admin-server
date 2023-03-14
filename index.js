const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;

const userRouter = require("./router/user");
const deviceRouter = require("./router/device");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use(userRouter);
app.use(deviceRouter);

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})
