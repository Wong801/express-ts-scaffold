import db from "engine/db";
import { ServiceConstructor } from "models/interfaces/service/service-interface";

export default class Service {
  readonly prisma: typeof db

  constructor({ prisma }: ServiceConstructor) {
    this.prisma = prisma
  }
}