#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to merge all source files from src directory into a single file
 * Usage: node scripts/merge-src.js [output-file]
 */

const SRC_DIR = 'src';
const DEFAULT_OUTPUT = 'src-merged.txt';

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip node_modules and other unwanted directories
      if (!['node_modules', '.git', 'dist'].includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Only include source files
      const ext = path.extname(file);
      if (['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function mergeFiles() {
  const outputFile = process.argv[2] || DEFAULT_OUTPUT;
  const files = getAllFiles(SRC_DIR);

  console.log(`🔍 Found ${files.length} source files to merge`);

  let mergedContent = `// Merged source files from ${SRC_DIR} directory
// Generated on: ${new Date().toISOString()}
// Total files: ${files.length}

`;

  files.forEach((filePath, index) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative('.', filePath);

      mergedContent += `\n${'='.repeat(80)}\n`;
      mergedContent += `// File ${index + 1}/${files.length}: ${relativePath}\n`;
      mergedContent += `${'='.repeat(80)}\n\n`;
      mergedContent += content;
      mergedContent += '\n';

      console.log(`✅ Merged: ${relativePath}`);
    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error.message);
    }
  });

  try {
    fs.writeFileSync(outputFile, mergedContent);
    console.log(`\n🎉 Successfully merged ${files.length} files into: ${outputFile}`);
    console.log(`📊 Output file size: ${(mergedContent.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error writing output file:', error.message);
    process.exit(1);
  }
}

// Run the merge
mergeFiles();