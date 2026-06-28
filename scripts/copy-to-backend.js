import { fileURLToPath } from 'url'
import { dirname, join, resolve, extname } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const frontendRoot = resolve(__dirname, '..')
const distDir = join(frontendRoot, 'dist')
const backendPublic = resolve(frontendRoot, '..', 'jobTracker-Backend', 'public')
const backendAssets = join(backendPublic, 'assets')

function fail(msg) {
  console.error(`\x1b[31m[deploy] ${msg}\x1b[0m`)
  process.exit(1)
}

if (!fs.existsSync(distDir)) {
  fail(`dist folder not found at "${distDir}". Run the build first.`)
}
if (!fs.existsSync(backendPublic)) {
  fail(`backend public folder not found at "${backendPublic}". Check that jobTracker-Backend is a sibling folder.`)
}

fs.mkdirSync(backendAssets, { recursive: true })

// 1. Remove everything in the backend assets folder except .png files
let removed = 0
for (const entry of fs.readdirSync(backendAssets, { withFileTypes: true })) {
  if (entry.isFile() && extname(entry.name).toLowerCase() !== '.png') {
    fs.rmSync(join(backendAssets, entry.name))
    removed++
  }
}
console.log(`[deploy] Removed ${removed} non-png file(s) from backend assets.`)

// 2. Copy the freshly built assets into the backend assets folder
const distAssets = join(distDir, 'assets')
let copiedAssets = 0
if (fs.existsSync(distAssets)) {
  for (const entry of fs.readdirSync(distAssets, { withFileTypes: true })) {
    if (entry.isFile()) {
      fs.copyFileSync(join(distAssets, entry.name), join(backendAssets, entry.name))
      copiedAssets++
    }
  }
}
console.log(`[deploy] Copied ${copiedAssets} asset file(s) into backend public/assets.`)

// 3. Copy the dist root files (index.html, vite.svg, ...) into backend public
let copiedRoot = 0
for (const entry of fs.readdirSync(distDir, { withFileTypes: true })) {
  if (entry.isFile()) {
    fs.copyFileSync(join(distDir, entry.name), join(backendPublic, entry.name))
    copiedRoot++
  }
}
console.log(`[deploy] Copied ${copiedRoot} root file(s) into backend public.`)
console.log('[deploy] Done. Backend public folder is up to date.')
