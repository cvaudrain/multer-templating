 const express = require("express")
 const multer = require("multer")
 const fs = require("fs")
 const mongoose = require("mongoose")
 const DB = "multerlocal"

const path = require("path")

 const app = express()
//  app.use(path())
app.set("view engine","ejs");

 app.use(express.json())
 app.use(express.urlencoded({extended:true}))

 app.use(express.static(path.join(__dirname,"../client")))
const PORT = process.env.PORT || 4000

 app.listen(PORT,()=>{
     console.log(`App listening on port ${PORT}`)
 })

//  for LOCAL
mongoose.connect("mongodb://localhost:27017/"+DB,{
    connectTimeoutMS:10000
});
const db = mongoose.connection;
db.on("error",(error)=>console.log(error))
db.once("open",()=>console.log(`Connected to ${DB} database on port ${PORT}`))

const Image = new mongoose.Schema(
    {
        name:String,
        contentType:String,
        image: {
            data: Buffer, //used for storing binary data like image files}
            contentType: String
    }
}
)
let ImageModel = db.model("ImageModel",Image)
//  sendFile routes
//  app.get("/",(req,res)=>{
//     console.log("Connected")
//      res.sendFile(path.join(__dirname + "/../client/index.html"))
    
//  //path.join or similar middleware required if server is in separate directory or else you get forvbidden sendStream error
//  })

//  Define Multer Storage
 const storage = multer.diskStorage({
     destination:function(req,file,cb){
         cb(null,"uploads")
     },
     filename:function(req,file,cb){
         cb(null,file.fieldname + "-" + Date.now())
     }
 })

 //var upload = multer({storage:storage}) //no security measures/filters
//  With security filter
 var upload = multer({
     storage:storage,
     limits: {
         fileSize:1500000 //limit 1.5MB
     },
     fileFilter(req,file,cb){
         if(!file.originalname.match(/\.(png|jpg|pdf)$/)){ //filter out non-images with every Multer call
             return cb(new Error("Please upload an image."))
         }
         cb(undefined,true)
     }
    }) 


// call uplaod.single for single file / image
// or upload.array for multi file / multi image
//The string argument passed in to upload,single/array will match the name attrubute of the html form that posted to the endpoint
//  Multer API Endpoints

app.post("/uploadfile",upload.single("singleFile"),(req,res,next)=>{
    const file = req.file 
    if(!file){ //handle error
        const error = new Error("Please upload a file")
        error.httpStatusCode = 400
        return next(error)
    } //if no error then..
    res.send(file)
})

app.post("/uploadmultifile",upload.array("multifile"),(req,res,next)=>{
    const files = req.files
    if(!files){ //handle error
        const error = new Error("Please choose files for upload")
        error.httpStatusCode = 400
        return next(error)
    } //if no error then..
    res.send(files)
})

// img upload       
app.post("/uploadimage",upload.single("imageFile"),(req,res)=>{
    var image = fs.readFileSync(req.file.path);
    var encode_image = image.toString('base64')
    
    var savedImage = {
        name:req.body.name,
        contentType:req.file.mimetype,
        image:{
            data:fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType: "image"
        }
    }
   ImageModel.create(savedImage,(err,item)=>{
       if(err){
           console.log(err)
           res.status(500)
       } else{
        console.log("save img complete")
           res.redirect("/")
       }
   })
    // if(!image){ //handle error
    //     const error = new Error("Please choose files for upload")
    //     error.httpStatusCode = 400
    //     return next(error)
    // } //if no error then..
    // res.json("Image saved successfully")
})


 
app.get("/",(req,res)=>{
    ImageModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log("success")
            // res.send(items)
            // res.render(".././client/views/imageviewer",{ items: items });
            res.render(".././client/views/index",{ items: items });
        }
    });
    // console.log("Connected")
    //  res.sendFile(path.join(__dirname + "/../client/page2.html"))
    
    //  res.json(`Client connected to server`)
 })

 