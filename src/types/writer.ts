export interface Writer {
  id: string;
  fullName: string;
  avatar: string | null;
  blogSlug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewWriterForm {
  id: string;
  fullName: string;
  avatar: string;
}
