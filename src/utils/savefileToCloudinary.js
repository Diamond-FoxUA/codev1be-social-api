import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const saveFileToCloudinary = async (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'podorozhnyky-app/stories',
        resource_type: 'image',
        overwrite: true, // перезаписывать старый файл
        public_id: publicId, // уникальный идентификатор
        use_filename: false,
        unique_filename: false,
      },
      (err, result) => {
        err ? reject(err) : resolve(result);
      },
    );
    Readable.from(buffer).pipe(uploadStream);
  });
};
