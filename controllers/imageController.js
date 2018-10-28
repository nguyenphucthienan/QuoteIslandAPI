const cloudinary = require('cloudinary');
const Datauri = require('datauri');

const cloudinaryService = require('../services/upload/cloudinaryService');

exports.cloudinaryUpload = (req, res) => (
  cloudinaryService(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    const dataUri = new Datauri();
    dataUri.format('.png', req.file.buffer);

    return cloudinary.uploader
      .upload(dataUri.content, response => (
        res.send({
          url: response.url,
          secureUrl: response.secure_url
        })
      ));
  })
);
