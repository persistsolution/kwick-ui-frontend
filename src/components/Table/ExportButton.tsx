import React from 'react';
import { Button } from 'react-bootstrap';
import { utils, writeFile } from 'xlsx';

interface ExportButtonProps {
  tableId: string; // ID of the table to export
  fileName: string; // Name of the Excel file
}

const ExportButton: React.FC<ExportButtonProps> = ({ tableId, fileName }) => {
  const exportToExcel = () => {
    const table = document.getElementById(tableId);
    if (table) {
      // Convert the table to a workbook
      const workbook = utils.table_to_book(table);

      // Generate the Excel file name dynamically
      const formattedFileName = `${fileName.replace(/\s+/g, '_')}.xlsx`; // Replace spaces with underscores
      writeFile(workbook, formattedFileName); // Save the Excel file
    } else {
      console.error(`Table with id "${tableId}" not found.`);
    }
  };

  return (
    <Button variant="success" onClick={exportToExcel}>
      <i className="fe fe-download me-2"></i>Export to Excel
    </Button>
  );
};

export default ExportButton;
