import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// routes
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/questions.js";

// app config

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json());

// db config

const mongoURI =
	"mongodb+srv://admin:TwE5Q8njUT9fPrkv@cluster0.vf9mb.mongodb.net/forumDB?retryWrites=true&w=majority";

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`))
	)
	.catch((error) => console.log(error.message));

mongoose.connection.once("open", () => {
	console.log("DB connected 🚀");
});

mongoose.set("useFindAndModify", false);

// api path
app.use("/auth", userRoutes);
app.use("/question", postRoutes);

// listen
// app.listen(port, () => `Server running on port ${port} 🔥`);
