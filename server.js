const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes serving
app.get("/", (req, res) => {
  res.status(200).render("index", {
    error: null,
  });
});

app.post("/reader", upload.single("file"), async (req, res, next) => {
  if (!req.file)
    return res.status(400).render("index", {
      error: "Please select a file",
    });
  const readFile = fs.readFileSync(req.file.path);
  try {
    const pdfExtract = await pdfParse(readFile);
    res.status(200).render("reader", {
      text: pdfExtract.text,
      name: req.file.originalname,
      pages: pdfExtract.numpages,
    });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log("Server running on port ", PORT));
