export type StorageConfig = { endpoint: string; bucket: string; accessKeyId: string; secretAccessKey: string; publicUrl: string };

export function getStorageConfig(): StorageConfig {
  const values = {
    endpoint: process.env.R2_ENDPOINT,
    bucket: process.env.R2_BUCKET,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    publicUrl: process.env.R2_PUBLIC_URL,
  };
  if (Object.values(values).some((value) => !value)) throw new Error("R2 storage is not configured.");
  return values as StorageConfig;
}

export function storageConfigured() {
  return Boolean(process.env.R2_ENDPOINT && process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_PUBLIC_URL);
}
