const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

//Initialize app
const app = express();
app.use(express.json());

//DB config
const db = config.get("mongoURI");

//connect to MongoDB
mongoose.connect(db, {
    'useNewUrlParser' : true,
    'useUnifiedTopology' : true,
    'useFindAndModify' : true,
    'useCreateIndex' : true
})
.then(() => console.log("MongoDB connected."))
.catch(err => console.log(err));

//Use routes
app.use("/api/exercises", require("./routes/api/exercises"));
app.use("/api/workouts", require("./routes/api/workouts"));
app.use("/api/auth", require("./routes/api/auth"));

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Server config
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server connected on port ${port}`));