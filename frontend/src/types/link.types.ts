// Link Management Types
export interface Link {
  _id: string;
  userId: User; // Change from string to User object
  originalUrl: string;
  shortCode: string;
  title?: string;
  clicks: number;
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
