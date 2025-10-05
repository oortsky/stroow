import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command
} from "@aws-sdk/client-s3";
import { s3Client } from "./s3-client";

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!;

export async function uploadFileToS3(
  file: File,
  key: string,
  bucket: string = BUCKET_NAME
): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ContentLength: file.size
    });

    await s3Client.send(command);

    // Return public URL
    return `${process.env.NEXT_PUBLIC_SUPABASE_S3_ENDPOINT?.replace(
      "/storage/v1/s3",
      ""
    )}/storage/v1/object/public/${bucket}/${key}`;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export async function deleteFileFromS3(
  key: string,
  bucket: string = BUCKET_NAME
): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("S3 delete error:", error);
    throw new Error("Failed to delete file from S3");
  }
}

export async function listFiles(prefix?: string, bucket: string = BUCKET_NAME) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix
    });

    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error("S3 list error:", error);
    throw new Error("Failed to list files from S3");
  }
}

export function generateFileKey(originalName: string, prefix?: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "_");

  const key = `${baseName}_${timestamp}_${randomString}.${extension}`;

  return prefix ? `${prefix}/${key}` : key;
}
