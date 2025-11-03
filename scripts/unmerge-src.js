#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to unmerge a merged source file back into individual files
 * Usage: node scripts/unmerge-src.js [input-file]
 */

const DEFAULT_INPUT = 'src-merged.txt';

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function unmergeFiles() {
  const inputFile = process.argv[2] || DEFAULT_INPUT;

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  console.log(`🔍 Reading merged file: ${inputFile}`);

  const content = fs.readFileSync(inputFile, 'utf8');
  const lines = content.split('\n');

  let currentFile = null;
  let currentContent = [];
  let fileCount = 0;
  let inFileSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for file separator
    if (line.startsWith('='.repeat(80))) {
      // If we were collecting content for a previous file, save it
      if (currentFile && currentContent.length > 0) {
        try {
          ensureDirectoryExists(currentFile);
          // Trim leading empty lines
          let trimmedContent = currentContent.join('\n');
          trimmedContent = trimmedContent.replace(/^\n+/, ''); // Remove leading newlines
          const finalContent = trimmedContent.trimEnd() + '\n';
          fs.writeFileSync(currentFile, finalContent);
          console.log(`✅ Restored: ${currentFile}`);
          fileCount++;
        } catch (error) {
          console.error(`❌ Error writing ${currentFile}:`, error.message);
        }
      }

      // Check if next line is a file header
      if (i + 1 < lines.length && lines[i + 1].startsWith('// File ')) {
        const fileHeader = lines[i + 1];
        const match = fileHeader.match(/^\/\/ File \d+\/\d+: (.+)$/);
        if (match) {
          currentFile = match[1];
          currentContent = [];
          inFileSection = true;
          i += 2; // Skip the file header line and the next separator line
          continue; // Skip processing the separator line
        } else {
          inFileSection = false;
          currentFile = null;
        }
      } else {
        inFileSection = false;
        currentFile = null;
      }
    } else if (inFileSection && !line.startsWith('// File ')) {
      // Collect content lines, but skip file headers
      currentContent.push(line);
    }
  }

  // Save the last file if any
  if (currentFile && currentContent.length > 0) {
    try {
      ensureDirectoryExists(currentFile);
      // Trim leading empty lines
      let trimmedContent = currentContent.join('\n');
      trimmedContent = trimmedContent.replace(/^\n+/, ''); // Remove leading newlines
      const finalContent = trimmedContent.trimEnd() + '\n';
      fs.writeFileSync(currentFile, finalContent);
      console.log(`✅ Restored: ${currentFile}`);
      fileCount++;
    } catch (error) {
      console.error(`❌ Error writing ${currentFile}:`, error.message);
    }
  }

  console.log(`\n🎉 Successfully restored ${fileCount} files from: ${inputFile}`);
}

// Run the unmerge
unmergeFiles();