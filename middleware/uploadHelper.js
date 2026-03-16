import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

export const uploadHelper = {
  single: (fieldName) =>
    multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }).single(fieldName),

  array: (fieldname, limit = 5) =>
    multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }).array(fieldname, limit),

  fields: (field) =>
    multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }).fields(
      field.map((f) => ({
        name: f,
        maxCount: 1,
      })),
    ),
};
