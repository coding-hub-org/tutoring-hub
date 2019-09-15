import { ConfigBase } from "cardboard-config";

export class ImagesConfig extends ConfigBase {
    public useCloudinary: boolean = true;
    public cloudinaryAPIKey: string = "CLOUDINARY_API_KEY";
    public cloudinaryAPISecret: string = "CLOUDINARY_API_SECRET";
    public cloudinaryCloudName: string = "CLOUDINARY_CLOUD_NAME";
}