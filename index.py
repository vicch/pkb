# -*- coding: utf-8 -*-

import linecache
import os.path
import string

def index(dirs, excludes):
	truncateIndex('.')

	for dir in dirs:
		indexDir(dir, excludes)


def indexDir(dir, excludes):
	if (not os.path.exists(dir) or not os.path.isdir(dir)):
		error('Directory not found: ' + dir)
		return

	info('Indexing: ' + path([dir]))

	dirName = string.capwords(dir)

	writeFrontMatter('.')

	# Add dir title to root index
	writeTitle('.', dirName);

	for subDir in sorted(os.listdir(dir)):
		indexSubDir(dir, dirName, subDir, excludes)


def indexSubDir(dir, dirName, subDir, excludes):
	subDirPath = path([dir, subDir])

	if (not os.path.isdir(subDirPath) or subDir in excludes):
		return

	info('Indexing: ' + subDirPath)

	subDirName = string.capwords(subDir)

	# Add sub dir entry to root index
	writeEntry('.', subDirName, subDirPath + '/index')

	truncateIndex(subDirPath)

	writeFrontMatter(subDirPath)

	# Add sub dir title to sub dir index
	writeTitle(subDirPath, dirName + ' / ' + subDirName)

	for file in sorted(os.listdir(subDirPath)):
		if (not file.startswith('.')) and file.endswith('.org'):
			# Add doc entry to sub dir index
			title = linecache.getline(subDirPath + '/' + file, 2)[9:].rstrip()
			writeEntry(subDirPath, title, subDirPath + '/' + file.replace('.org', '.html'))


def truncateIndex(dirPath):
	filePath = dirPath + '/index.md'
	with open(filePath, 'w+') as file:
		file.truncate()


def writeFrontMatter(dirPath):
	# Set the title to be empty string
	writeLine(dirPath, '---\ntitle: ""\n---\n\n')


def writeTitle(dirPath, title):
	writeLine(dirPath, '\n## ' + title + '\n\n')


def writeEntry(dirPath, name, link):
	writeLine(dirPath, '- [' + name + '](/pkb/' + link + ')\n')


def writeLine(dirPath, line):
	filePath = dirPath + '/index.md'
	with open(filePath, 'a+') as file:
		file.write(line)


def path(dirs):
	path = '/'.join(dirs)
	return path


def error(message):
	print('[ERROR] ' + message)


def info(message):
	print('[INFO] ' + message)


index(
	['programming', 'general'],
	['images']
)