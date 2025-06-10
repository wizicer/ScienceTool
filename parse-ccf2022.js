const fs = require('fs');
const path = require('path');

// File paths
const inputFile = path.join(__dirname, 'public/data/中国计算机学会推荐国际学术会议和期刊目录-2022.pdf.md');
const outputFile = path.join(__dirname, 'public/data/ccf2022.csv');
const categoryFile = path.join(__dirname, 'public/data/category.csv');

// Read category mapping
const categoryData = fs.readFileSync(categoryFile, 'utf8');
const categoryLines = categoryData.split('\n').filter(line => line.trim());
const categoryMap = {};

// Skip header line and parse categories
categoryLines.slice(1).forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 3) {
    const code = parts[0].trim();
    const name = parts[2].trim();
    categoryMap[name] = code;
  }
});

// Read the input markdown file
const data = fs.readFileSync(inputFile, 'utf8');

// Initialize variables
let entries = [];
let currentCategory = '';
let currentGrade = '';
let isJournal = false;
let categoryCode = '';
let index = 1;

// Parse the markdown file
const lines = data.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Detect category
  if (line.startsWith('# (') || line.startsWith('# （')) {
    const categoryMatch = line.match(/[(（](.+?)[）)]/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];

      // Map category name to code
      switch (currentCategory.replaceAll('／', '/')) {
        case '计算机体系结构/并行与分布计算/存储系统':
          categoryCode = '1';
          break;
        case '计算机网络':
          categoryCode = '2';
          break;
        case '网络与信息安全':
          categoryCode = '3';
          break;
        case '软件工程/系统软件/程序设计语言':
          categoryCode = '4';
          break;
        case '数据库/数据挖掘/内容检索':
          categoryCode = '5';
          break;
        case '计算机科学理论':
          categoryCode = '6';
          break;
        case '计算机图形学与多媒体':
          categoryCode = '7';
          break;
        case '人工智能':
          categoryCode = '8';
          break;
        case '人机交互与普适计算':
          categoryCode = '9';
          break;
        case '交叉/综合/新兴':
          categoryCode = '10';
          break;
        default:
          categoryCode = '';
      }
    }
  }

  // Detect if we're dealing with journals or conferences
  if (line.includes('期刊') || line.includes('刊物')) {
    isJournal = true;
  } else if (line.includes('会议')) {
    isJournal = false;
  }

  // Detect grade
  if (line.includes('A 类') || line === '# 一、A 类') {
    currentGrade = 'A';
  } else if (line.includes('B 类') || line === '# 二、B 类') {
    currentGrade = 'B';
  } else if (line.includes('C 类') || line === '# 三、C 类') {
    currentGrade = 'C';
  }

  // Parse table rows
  if (line.startsWith('|') && !line.startsWith('|---') && !line.startsWith('|序号')) {
    const columns = line.split('|').map(col => col.trim()).slice(1, 6);

    if (columns.length >= 5) {
      // Extract data from columns
      const number = columns[0].trim();
      const abbr = columns[1].trim().replace('&amp;', '&');
      const fullName = columns[2].trim();
      const publisher = columns[3].trim();
      const url = columns[4].trim();

      // Skip empty rows or rows with placeholder text
      if (fullName && Number(number) > 0) {
        entries.push({
          index,
          abbr,
          fullName,
          publisher,
          url,
          grade: currentGrade,
          type: isJournal ? 'Journal' : 'Conference',
          category: categoryCode
        });
        index++;
      }
    }
  }
}

// Generate CSV content
let csvContent = '刊物名称,刊物全称,出版社,地址,等级,期刊/会议,类别\n';
entries.forEach(entry => {
  csvContent += `${entry.abbr},"${entry.fullName}","${entry.publisher}",${entry.url},${entry.grade},${entry.type},${entry.category}\n`;
});

// Write to output file
fs.writeFileSync(outputFile, csvContent);

console.log(`Processed ${entries.length} entries and saved to ${outputFile}`);
