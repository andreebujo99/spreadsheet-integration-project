import { File } from '../models/file';

export class FileRepository {

    create(data: any) {
        return File.create(data);
    }

    count() {
        return File.countDocuments();
    }

    findPaged(
        skip: number,
        limit: number,
        sortField: string,
        sortOrder: number
    ) {
        return File.find()
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit)
            .select('_id originalName size uploadDate');
    }

    findById(id: string) {
        return File.findById(id);
    }

    async updateColumns(id: string, columns: any[]) {
        const file = await File.findById(id);

        if (!file) return null;

        file.columns = columns;
        return file.save();
    }
}
