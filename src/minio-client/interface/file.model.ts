export interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer;
}

export interface StoredFile extends HasFile, StoredFileMataData {}

export interface HasFile {
  file: Buffer | string;
}

export interface StoredFileMataData {
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}

export type AppMimeType = 'image/png' | 'image/jpeg' | 'image/jpg';
