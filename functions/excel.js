import Excel from 'exceljs';
import dotenv from 'dotenv';
dotenv.config();

export async function writeToExcel(dataArray) {
    const workbook = new Excel.Workbook();
    const path = process.env.OUTPUT_DIR; // 환경 변수에서 경로 읽기

    try {
        await workbook.xlsx.readFile(path);
    } catch {
        workbook.addWorksheet('My Sheet');
    }

    const worksheet = workbook.getWorksheet('My Sheet') || workbook.addWorksheet('My Sheet');
    const lastRowNumber = worksheet.lastRow ? worksheet.lastRow.number : 0;

    if (lastRowNumber === 0) {
        worksheet.addRow(['원제목', '수정된제목', '설명']);
    }

    dataArray.forEach(data => {
        worksheet.addRow([data.originalName, data.modifiedName, data.description]);
    });

    await workbook.xlsx.writeFile(path);
}
