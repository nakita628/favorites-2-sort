import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  singleQuote: true,
  semi: false,
  sortPackageJson: true,
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
})
