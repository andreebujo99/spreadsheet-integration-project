function isNumber(v: any) {
  return v !== '' && !isNaN(Number(v));
}

function isDate(v: any) {
  return !isNaN(Date.parse(v));
}

export function detectColumnTypes(
  headers: string[],
  rows: any[]
) {

  return headers.map(h => {

    const values = rows
      .map(r => r[h])
      .filter(v => v !== undefined && v !== '');

    if (!values.length)
      return { name: h, type: 'string' };

    const allNumbers = values.every(isNumber);
    if (allNumbers)
      return { name: h, type: 'number' };

    const allDates = values.every(isDate);
    if (allDates)
      return { name: h, type: 'date' };

    return { name: h, type: 'string' };
  });
}
