export default class Logger {
  constructor(private readonly name: string) {}

  private static getTime() {
    return new Date().toISOString();
  }

  static debug(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'DEBUG', Logger.name, ].map(param => `[${param}]`).join(' ');
    console.log(`${params} ${message}`, ...args);
  }

  debug(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'DEBUG', this.name].map(param => `[${param}]`).join(' ');
    console.log(`${params} ${message}`, ...args);
  }

  static info(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'INFO', Logger.name].map(param => `[${param}]`).join(' ');
    console.info(`${params} ${message}`, ...args);
  }

  info(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'INFO', this.name].map(param => `[${param}]`).join(' ');
    console.info(`${params} ${message}`, ...args);
  }

  static warn(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'WARN', Logger.name].map(param => `[${param}]`).join(' ');
    console.warn(`${params} ${message}`, ...args);
  }

  warn(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'WARN', this.name].map(param => `[${param}]`).join(' ');
    console.warn(`${params} ${message}`, ...args);
  }

  static error(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'ERROR', Logger.name].map(param => `[${param}]`).join(' ');
    console.error(`${params} ${message}`, ...args);
  }

  error(message: string, ...args: any): void {
    const params = [Logger.getTime(), 'ERROR', this.name].map(param => `[${param}]`).join(' ');
    console.error(`${params} ${message}`, ...args);
  }
}
