export interface Image {
  id: string;
  name: string;
  url: string;
  bucket: string;
  path: string;
  createdAt: string;
  createdBy: string;
  tags?: string[];
}