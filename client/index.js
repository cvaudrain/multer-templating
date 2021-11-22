

// const axios = require("axios")
console.log("Linked: html - CSS Stylesheet")


// let qs = document.querySelector
// let submitBtn = document.querySelector("#uploadFileBtn")
// let selectBtn = document.querySelector("#selectFileBtn")
// let fileInput = document.querySelector("#inputFile")
// let nameInput = document.querySelector("#inputName")
// let varList = [submitBtn,selectBtn,fileInput,nameInput]

$(document).on("keydown",(e)=>{
   console.log(e.target.value)
    // console.log(formData)
})

// const imageStorage = multer.diskStorage({ //define disk storage properties with multer.diskStorage() method
//     destination:"images", //lets app know where to store images- must specify
//     filename:(req,file,cb) =>{ //name of the image 
//         cb(null,file.fieldname + "_" + Date.now()
//         + path.extname(file.originalname)) //gets ext type of uploaded file
//     }
// });

// const imageUpload = multer({
//     storage:imageStorage, //prev defined above
//     limits:{
//         fileSize:1000000 // 1000000 Bytes = 1mb
//     },
//     fileFilter(req,file,cb){ //!IMPORTANT: filtering to ensure ONLY png or jpg ensures no malicious files are uploaded, i.e exe files, js file to call etc
//         if(!file.originalname.match(/\.(png|jpg)$/)){
//             return cb(new Error("Please Upload an image file."))
//         }
//         cb(undefined,true)
//     }
// })



// console.log(formValue)