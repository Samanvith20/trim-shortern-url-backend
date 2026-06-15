import mongoose, { Schema } from "mongoose";

export interface IUrl {
  code: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    originalUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);




const Url = mongoose.model<IUrl>("Url", urlSchema);

export default Url;