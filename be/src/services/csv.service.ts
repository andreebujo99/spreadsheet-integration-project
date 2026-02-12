import fs from 'fs';
import csv from 'csv-parser';

export class CsvService {

    getPreview(path: string)
        : Promise<{ headers: string[], preview: any[] }> {

        return new Promise((resolve, reject) => {

            const preview: any[] = [];
            let headers: string[] = [];

            fs.createReadStream(path)
                .pipe(csv())
                .on('headers', h => headers = h)
                .on('data', row => {

                    if (preview.length < 5)
                        preview.push(row);

                })
                .on('end', () =>
                    resolve({ headers, preview })
                )
                .on('error', reject);

        });
    }
}
