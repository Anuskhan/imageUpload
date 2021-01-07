const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const rand = require("random-key");

exports.uploadPdf = (file) => {
  // The file shows up on req.body instead of req.file, per multer docs.
  const { file } = req.body;

  // File is written, but it's not a readable PDF.
  const tmp = fs.writeFileSync(
    path.join(`src/uploads/image/`, './test.pdf'),
    file,
  );
},

exports.upload = (imgsrc) => {
  let randfile = rand.generate(20) + "." + imgsrc.mimetype.split("/")[1];
  sharp(imgsrc.data)
    .resize({
      width: 512,
      height: 512,
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(`src/uploads/image/${randfile}`, (err, info) => {
      console.log(err)
    });
  return `uploads/image/${randfile}`
}


// Upload Multiple Image
exports.uploadMulitple = (imgsrc) => {
  let randfile;
  let multiple_image = [];
  let url = [];
  imgsrc.forEach((e) => {
    randfile = rand.generate(20) + "." + e.mimetype.split("/")[1];
    e.modified_name = randfile;
    url.push(`uploads/image/${randfile}`);
    multiple_image.push(e);
  });
  multiple_image.map((v) => {
    sharp(v.data)
      .resize({
        width: 512,
        height: 512,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(`src/uploads/image/${v.modified_name}`, (err, info) => { });
  });
  return url;
}

// Delete image imagePath like test.png
exports.Delete = (imagePath) => {
  const filePath1 = path.join(
    __dirname,
    `../${imagePath}`
  );
  fs.unlink(filePath1, (err) => console.log(err));
}

// Delete Multiple image imagePath like test.png
exports.deleteMultiple = (imagePathArray) => {
  imagePathArray.map(i => {
    const filePath1 = path.join(
      __dirname,
      `../${i}`
    );
    fs.unlink(filePath1, (err) => console.log(err));
  })
}
