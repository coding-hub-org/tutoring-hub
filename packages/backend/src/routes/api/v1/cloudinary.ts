import { Request, Response, Router, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';

const router: Router = Router();

////////////////////////////////////////////////////////////////////////////////////////

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "tutoring-hub/tutor-profile/",
  allowedFormats: ["jpg", "png"]
});

const parser = multer({
  storage: storage
}).single("image");

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("Main route for cloudinary");
});

router.post("/upload", parser, function (req: any, res: Response, next: NextFunction) {
  res.json(req.file);
});

router.delete("/delete", function (req: Request, res: Response, next: NextFunction) {
  cloudinary.v2.uploader.destroy(req.body.public_id, function (result, error) {
    if (error) {
      res.json(error);
    }
    console.log(result);
    res.json(result);
  });
});

////////////////////////////////////////////////////////////////////////////////////////

export default router;