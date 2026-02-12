import { Schema, model } from 'mongoose';

const ColumnSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['string', 'number', 'date'],
    required: true
  }
});

const FileSchema = new Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    columns: { type: [ColumnSchema], default: [] },
    preview: { type: [Schema.Types.Mixed], default: [] }
  },
  { timestamps: true }
);

export const File = model('File', FileSchema);
