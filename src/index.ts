#!/usr/bin/env node

/*!
 *       ___           ___           ___           ___           ___           ___       ___           ___           ___
 *      /\__\         /\  \         /\  \         /\  \         /\  \         /\__\     /\  \         /\  \         /\  \
 *     /::|  |       /::\  \       /::\  \       /::\  \       /::\  \       /:/  /    /::\  \       /::\  \       /::\  \
 *    /:|:|  |      /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/  /    /:/\:\  \     /:/\:\  \     /:/\:\  \
 *   /:/|:|  |__   /::\~\:\  \   /::\~\:\  \   /::\~\:\  \   /::\~\:\  \   /:/  /    /::\~\:\  \   /::\~\:\  \   /::\~\:\  \
 *  /:/ |:| /\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/__/    /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\
 *  \/__|:|/:/  / \/__\:\/:/  / \/_|::\/:/  / \/_|::\/:/  / \/__\:\/:/  / \:\  \    \:\~\:\ \/__/ \/__\:\/:/  / \/__\:\ \/__/
 *      |:/:/  /       \::/  /     |:|::/  /     |:|::/  /       \::/  /   \:\  \    \:\ \:\__\        \::/  /       \:\__\
 *      |::/  /        /:/  /      |:|\/__/      |:|\/__/        /:/  /     \:\  \    \:\ \/__/        /:/  /         \/__/
 *      /:/  /        /:/  /       |:|  |        |:|  |         /:/  /       \:\__\    \:\__\         /:/  /
 *      \/__/         \/__/         \|__|         \|__|         \/__/         \/__/     \/__/         \/__/
 *
 * © 2025 NarraLeaf
 * NarraLeaf-React Skeleton
 * A suggested project structure for NarraLeaf-React App
 *
 * @author: Nomen (helloyork) https://github.com/helloyork
 * @license: MIT
 */

import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import chalk from 'chalk';
import process from 'process';

const SKELETON_DIR = join(__dirname, '..', 'skeleton');

function copyDir(src: string, dest: string) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    let destPath = join(dest, entry.name);

    // Handle special case for gitignore
    if (entry.name === 'gitignore') {
      destPath = join(dest, '.gitignore');
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.error(chalk.red('Please provide a target path'));
    console.log(chalk.yellow('Usage: npx nlr-skeleton <PATH>'));
    process.exit(1);
  }

  const absoluteTargetPath = resolve(process.cwd(), targetPath);

  try {
    console.log(chalk.blue('🚀 Creating new NarraLeaf-React project...'));

    // Copy skeleton files
    copyDir(SKELETON_DIR, absoluteTargetPath);
    console.log(chalk.green('✅ Skeleton files copied successfully'));

    // Change to target directory and run npm install
    process.chdir(absoluteTargetPath);
    console.log(chalk.blue('📦 Installing dependencies...'));
    execSync('npm install', { stdio: 'inherit' });

    console.log(chalk.green('\n✨ Project created successfully!'));
    console.log(chalk.yellow('\nNext steps:'));
    console.log(chalk.white('  ' + chalk.blue("cd") + ' ' + targetPath));
    console.log(chalk.white('  ' + chalk.blue("npm") + ' run dev'));

  } catch (error) {
    console.error(chalk.red('❌ Error:'), error);
    process.exit(1);
  }
}

main();