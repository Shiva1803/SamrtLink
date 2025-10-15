import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
  userId: mongoose.Types.ObjectId;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  title?: string;
  description?: string;
  qrCode?: string;
  clicks: number;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customAlias: {
      type: String,
      unique: true,
      sparse: true,
    },
    title: String,
    description: String,
    qrCode: String,
    clicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Link = mongoose.model<ILink>('Link', LinkSchema);

