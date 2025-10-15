// Link Management Types
export interface Link {
  _id: string;  // MongoDB uses _id, not id
  id?: string;  // Optional for compatibility
  userId: string;
  originalUrl: string;
  shortUrl?: string;
  shortCode: string;
  customAlias?: string;
  customSlug?: string;
  qrCode?: string;
  title?: string;
  description?: string;
  clicks: number;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLinkRequest {
  originalUrl: string;
  customSlug?: string;
  title?: string;
  description?: string;
}

export interface UpdateLinkRequest {
  title?: string;
  description?: string;
  isActive?: boolean;
}

export interface LinkStats {
  totalLinks: number;
  totalClicks: number;
  activeLinks: number;
}
