import * as XLSX from 'xlsx';

export class ExcelService {

  getPreview(path: string)
    : { headers: string[], preview: any[] } {

    const workbook = XLSX.readFile(path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows: any[] = XLSX.utils.sheet_to_json(sheet, {
      defval: null
    });

    const headers = rows.length ? Object.keys(rows[0]) : [];
    const preview = rows.slice(0, 5);

    return { headers, preview };
  }
}
