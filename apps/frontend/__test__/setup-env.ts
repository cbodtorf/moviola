import { loadEnvConfig } from '@next/env'

export default async function setupEnv() {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}