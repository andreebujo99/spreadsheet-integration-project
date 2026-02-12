import { FileRepository } from '../repositories/file.repository';
import { detectColumnTypes } from '../utils/type-detector';
import { CsvService } from './csv.service';
import { ExcelService } from './excel.service';
import fs from 'fs/promises';
import path from 'path';

const repo = new FileRepository();
const csv = new CsvService();
const excel = new ExcelService();

export class FileService {

    private async getPreviewByType(filePath: string) {
        const ext = path.extname(filePath).toLowerCase();

        if (ext === '.csv')
            return csv.getPreview(filePath);

        if (ext === '.xlsx' || ext === '.xls')
            return excel.getPreview(filePath);

        throw new Error('Unsupported file format');
    }

    async handleUpload(file: Express.Multer.File) {

        try {

            const { headers, preview } =
                await this.getPreviewByType(file.path);

            const detected = detectColumnTypes(headers, preview);

            const created = await repo.create({
                filename: file.filename,
                originalName: file.originalname,
                size: file.size,
                columns: detected,
                preview
            });

            return {
                fileId: created._id,
                preview,
                columns: created.columns
            };

        } finally {
            try {
                await fs.unlink(file.path);
            } catch {
                console.warn('Temp file cleanup failed:', file.path);
            }
        }
    }

    async getFiles(query: any) {

        const skip = parseInt(query.skip) || 0;
        const limit = parseInt(query.limit) || 10;
        const sortField = query.sortField || 'uploadDate';
        const sortOrder = query.sortOrder === '1' ? 1 : -1;

        const totalRecords = await repo.count();
        const files = await repo.findPaged(
            skip,
            limit,
            sortField,
            sortOrder
        );

        return { files, totalRecords };
    }

    async getFileById(id: string) {
        return repo.findById(id);
    }

    async updateColumns(id: string, columns: any[]) {

        const allowed = ['string', 'number', 'date'];

        const sanitized = columns.map(c => ({
            name: c.name,
            type: allowed.includes(c.type)
                ? c.type
                : 'string'
        }));

        return repo.updateColumns(id, sanitized);
    }
}

export const fileService = new FileService();
