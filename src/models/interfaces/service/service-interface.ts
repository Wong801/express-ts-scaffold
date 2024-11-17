import db from "engine/db";

export interface ServiceConstructor {
  prisma: typeof db
}

export interface ExtendedServiceConstructor {
  prisma?: typeof db
}
