export default class Module {
  public name: string | null
  public warnings?: string

  constructor() {
    this.name = null;
    this.warnings = undefined;
  }
}