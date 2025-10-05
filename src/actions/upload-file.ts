"use server";

import { uploadFileToS3, generateFileKey } from "@/lib/s3-upload";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    const fileType = file.type.split("/")[0];
    const prefix = `uploads/${fileType}s`;
    const key = generateFileKey(file.name, prefix);

    const url = await uploadFileToS3(file, key);

    return {
      success: true,
      url,
      key,
      fileName: file.name,
      fileSize: file.size,
      fileType
    };
  } catch (error) {
    console.error("Server action upload error:", error);
    return {
      success: false,
      error: "Upload failed"
    };
  }
}
