import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getStorageConfig, storageConfigured } from "./storage";

function client() {
  const c = getStorageConfig();
  return { c, s3: new S3Client({ region: "auto", endpoint: c.endpoint, credentials: { accessKeyId: c.accessKeyId, secretAccessKey: c.secretAccessKey } }) };
}

export async function deleteStoredMedia(url: string) {
  if (!storageConfigured()) return;
  const { c, s3 } = client();
  const prefix = `${c.publicUrl.replace(/\/$/, "")}/`;
  if (!url.startsWith(prefix)) return;
  const key = url.slice(prefix.length);
  await s3.send(new DeleteObjectCommand({ Bucket: c.bucket, Key: key }));
}
