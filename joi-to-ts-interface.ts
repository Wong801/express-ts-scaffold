import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
  schemaDirectory: './src/models/schemas/joi',
  typeOutputDirectory: './src/models/interfaces/joi',
  debug: true
});