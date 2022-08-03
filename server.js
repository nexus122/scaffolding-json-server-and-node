const path = require("path");
const jsonServer = require("json-server");
const cors = require("cors");
const multer = require("multer");
const express = require("express");

//const server = jsonServer.create();
const app = express();

const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3201;

const urlSave = "./public";

app.use(cors());



app.use(middlewares);
app.use(jsonServer.bodyParser);

/* Manipular archivos */
const storage = multer.diskStorage({
  // Manipulamos los objetos para cambiar su nombre y decir donde los guardamos
  filename: function (res, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = Date.now();
    cb(null, `${filename}.${ext}`);
  },
  destination: function (res, file, cb) {
    cb(null, urlSave);
  },
});

const upload = multer({ storage }); // Configuramos una variable donde guardamos el multer

app.post("/upload", upload.single("myFile"), (req, res) => {
  // Interceptamos el objeto y lo pasamos por multer.
  const file = req.file;
  res.send({url: `${file.filename}`});
});

app.get("/",(req,res)=>{
  res.send("Hola 👋, si quieres obtener tus datos prueba con /api/smugglers");
})

app.use('/api',router);
app.use('/public', express.static(urlSave));

app.listen(port, () => {
  console.log("JSON app is running in: ", port);
});
