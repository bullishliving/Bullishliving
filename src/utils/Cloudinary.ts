import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from "@/utils/privateKeys";

class Cloudinary {
  async upload(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET!);
      formData.append("resource_type", "raw");

      const response = await fetch(`${CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data: { secure_url: string } = await response.json();
      return data.secure_url;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async uploadMultiple(files: File[]) {
    try {
      const uploadPromises = files.map((file) => this.upload(file)); 
      const urls = await Promise.all(uploadPromises); 
      return urls;
    } catch (error: any) {
      console.error(error);
      throw new Error("Failed to upload multiple files");
    }
  }
}

const cloudinaryInstance = new Cloudinary();
export default cloudinaryInstance;
