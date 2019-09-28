const express = require("express");
const connectDB = require("./config/db");
const path = require();
const app = express("path");
//Conect DB
connectDB();
//Init middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Server static assets
if (process.env.NODE_ENV === "production") {
  // Set Static filder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started in port ${PORT}`));
