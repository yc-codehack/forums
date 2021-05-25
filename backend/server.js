import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// routes
import userRoutes from "./routes/users.js";

// SECTION app congif

const app = express();
const port = process.env.PORT || 5000;

// !SECTION

// SECTION middleware

app.use(cors());
app.use(express.json());

// !SECTION

// SECTION db config

const mongoURI =
	"mongodb+srv://admin:TwE5Q8njUT9fPrkv@cluster0.vf9mb.mongodb.net/forumDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// che
mongoose.connection.once("open", () => {
	console.log("DB connected 🚀");
});

// !SECTION

// SECTION api config
app.use("/auth", userRoutes);
// !SECTION

// SECTION listen
app.listen(port, () => `Server running on port ${port} 🔥`);
// !SECTION
