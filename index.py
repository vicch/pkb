# -*- coding: utf-8 -*-

import linecache
import os.path
import string

def index(dirs, excludes):
	truncateIndex('.')

	writeFrontMatterToIndex('.', '')

	for dir in dirs:
		indexDir(dir, excludes)


def indexDir(dir, excludes):
	if (not os.path.exists(dir) or not os.path.isdir(dir)):
		error('Directory not found: ' + dir)
		return

	info('Indexing: ' + path([dir]))

	dirName = string.capwords(dir)

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

	title = dirName + ' / ' + subDirName

	writeFrontMatterToIndex(subDirPath, '')

	# Add sub dir title to sub dir index
	writeTitle(subDirPath, title)

	for file in sorted(os.listdir(subDirPath)):
		if (not file.startswith('.')) and file.endswith('.org'):
			# Expect title string on 2nd line and skip the first 9 chars
			title = linecache.getline(subDirPath + '/' + file, 2)[9:].rstrip()
			htmlFilePath = subDirPath + '/' + file.replace('.org', '.html')
			# Add doc entry to sub dir index
			writeEntry(subDirPath, title, htmlFilePath)
			# Add Jekyll front matter to HTML file
			writeFrontMatterToPage(htmlFilePath, title)


def truncateIndex(dirPath):
	filePath = dirPath + '/index.md'
	with open(filePath, 'w+') as file:
		file.truncate()


def getFrontMatterString(title):
	return '---\ntitle: "' + title + '"\n---\n'


def writeFrontMatterToIndex(dirPath, title):
	# Set the title to be empty string
	writeLine(dirPath, getFrontMatterString(title))


def writeFrontMatterToPage(filePath, title):
	try:
		with open(filePath, 'r+') as f:
			body = f.read()
			# If not already have front matter
			# TODO: Make it replace existing front matter
			if (not body.startswith('---')):
				f.seek(0)
				f.write(getFrontMatterString(title) + body)
	except IOError:
		return


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