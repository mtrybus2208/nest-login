import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres' as const,

      host: this.getValue('DB_HOST'),
      port: parseInt('DB_PORT', 10),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('DB_NAME'),

      entities: ['dist/**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: [join(__dirname, '..', 'migrations', '*.ts')],

      cli: {
        migrationsDir: '../migrations',
      },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
]);

export { configService };
