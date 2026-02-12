import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FileService {

    private http = inject(HttpClient);
    private base = 'http://localhost:3000/api/files';

    upload(file: File) {

        const form = new FormData();
        form.append('file', file);

        return this.http.post<{
            fileId: string,
            preview: any[],
            columns: any[]
        }>(`${this.base}/upload`, form);
    }

    list(params: any) {
        return this.http.get<{
            files: any[],
            totalRecords: number
        }>(this.base, { params });
    }

    getById(id: string) {
        return this.http.get<any>(`${this.base}/${id}`);
    }

    saveColumnTypes(id: string, columns: any[]) {
        return this.http.put(
            `${this.base}/${id}/columns`,
            { columns }
        );
    }
}
