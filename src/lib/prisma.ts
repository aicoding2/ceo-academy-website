import { PrismaClient } from '@prisma/client'

let prismaSingleton: PrismaClient | undefined

export function getPrisma(): any {
  if (!prismaSingleton) {
    prismaSingleton = new PrismaClient()
  }
  return prismaSingleton
}

export const prisma = getPrisma()