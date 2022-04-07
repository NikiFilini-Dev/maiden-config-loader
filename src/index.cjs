const tsNode = require('ts-node')
const path = require('path')
const fs = require('fs-extra')

module.exports = async (root, originalName, newName) => {
  const originalPath = path.join(root, originalName)
  const newPath = path.join(root, newName)

  const content = tsNode.create().compile(
    await fs.readFile(originalPath, {
      encoding: 'utf8',
    }),
  )

  await fs.writeFile(newPath, content)

  const data = (await import('file://' + newPath)).default

  await fs.rm(newPath)

  return data
}
