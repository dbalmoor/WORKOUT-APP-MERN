require("dotenv").config();
const cors = require("cors");
// Allow all origins

// Allow specific origin(s)
const express = require("express");
const mongoose = require("mongoose");

//express
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const workoutRoutes = require("./routes/workouts");

//middleware
app.use(express.json());

app.use(
  cors({
    origin:
      "",
      methods: ["GET", "POST"],
      credentials: true
  })
);


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

//connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB,listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(`DB connection error ${err}`);
  });
