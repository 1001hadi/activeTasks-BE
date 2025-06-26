import multer from "multer";

// storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/");
  },
  filename: (req, file, cd) => {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});

// filter the files
const fileFilter = (req, file, cd) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cd(null, true);
  } else {
    cd(new Error("jpeg, png and jpg are allowed format!"), false);
  }
};

export const upload = multer({ storage, fileFilter, limits: { files: 1 } });
