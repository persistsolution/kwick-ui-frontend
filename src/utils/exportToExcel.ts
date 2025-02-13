import { utils, writeFile } from 'xlsx';

export const exportToExcel = (tableId: string, filename: string) => {
    const table = document.getElementById(tableId);
    if (table) {
        const workbook = utils.table_to_book(table);
        writeFile(workbook, filename);
    } else {
        console.error('Table not found for export');
    }
};
