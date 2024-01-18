import Excel from 'exceljs';

async function writeToExcel(dataArray) {
    const workbook = new Excel.Workbook();
    const path = 'path/to/your/excelfile.xlsx';

    try {
        await workbook.xlsx.readFile(path);
    } catch {
        workbook.addWorksheet('My Sheet');
    }

    const worksheet = workbook.getWorksheet('My Sheet');
    let firstRow = worksheet.getRow(1);

    if (!firstRow.getCell(1).value) {
        firstRow.getCell(1).value = '원래이름';
    }
    if (!firstRow.getCell(2).value) {
        firstRow.getCell(2).value = '수정된이름';
    }
    firstRow.commit();

    dataArray.forEach((data, index) => {
        const row = worksheet.getRow(index + 2);
        row.getCell(1).value = data.originalName;
        row.getCell(2).value = data.modifiedName;
        row.commit();
    });

    await workbook.xlsx.writeFile(path);
}

const myData = [
    { originalName: 'file1', modifiedName: 'newfile1' },
    { originalName: 'file2', modifiedName: 'newfile2' }
    // Add more data objects as needed
];

writeToExcel(myData);
