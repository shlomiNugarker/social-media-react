import { httpService } from "./httpService";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const uploadImg = async (ev) => {
  try {
    const file = ev.target.files[0];

    if (!file) {
      throw new Error("No file selected");
    }

    const base64File = await toBase64(file);

    const response = await httpService.post("cloudinary/upload", {
      file: base64File,
      resourceType: "image",
    });

    return response;
  } catch (err) {
    console.error("Error uploading image:", err?.message);
    throw err;
  }
};

export const uploadVid = async (ev) => {
  try {
    const file = ev.target.files[0];

    if (!file) {
      throw new Error("No file selected");
    }

    const base64File = await toBase64(file);

    const response = await httpService.post("cloudinary/upload", {
      file: base64File,
      resourceType: "video",
    });

    return response;
  } catch (err) {
    console.error("Error uploading video:", err?.message);
    throw err;
  }
};
