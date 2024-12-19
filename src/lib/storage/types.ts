export interface BucketConfig {
  public: boolean;
  allowedMimeTypes: string[];
  fileSizeLimit: number;
}

export interface StorageError {
  message: string;
  code?: string;
  details?: any;
}

export interface UploadResult {
  url: string;
  path: string;
}