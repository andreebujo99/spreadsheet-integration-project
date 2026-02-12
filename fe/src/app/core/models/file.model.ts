export interface FileMeta {
    id: string;
    name: string;
    uploadDate: string;
    columnTypes: Record<string, ColumnType>;
}

export type ColumnType = 'string' | 'number' | 'date';
