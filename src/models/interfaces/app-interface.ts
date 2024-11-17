import type { Express } from 'express'
import express from 'express'

export interface AppConstructor {
  express?: typeof express
}

export interface IApp {
  init (): Express
  start(): Express
}