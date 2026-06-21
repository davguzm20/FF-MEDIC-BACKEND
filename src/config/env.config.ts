import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DB_HOST: string;

  @IsString()
  DB_PORT: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;

  @IsString()
  JWT_REFRESH_EXPIRES_IN: string;

  @IsNumber()
  PORT: number;

  @IsString()
  CORS_ORIGINS: string;

  @IsNumber()
  BCRYPT_SALT_ROUNDS: number;

  @IsNumber()
  REDIS_BLACKLIST_TTL: number;

  @IsNumber()
  RESET_TOKEN_TTL: number;
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validated;
}

let _config: EnvironmentVariables | null = null;

export function envConfig() {
  if (!_config) {
    _config = validate(process.env as Record<string, unknown>);
  }
  return {
    port: _config.PORT,
    jwtSecret: _config.JWT_SECRET,
    jwtRefreshSecret: _config.JWT_REFRESH_SECRET,
    jwtExpiresIn: _config.JWT_EXPIRES_IN,
    jwtRefreshExpiresIn: _config.JWT_REFRESH_EXPIRES_IN,
    corsOrigins: _config.CORS_ORIGINS.split(',').map((s) => s.trim()),
    database: {
      host: _config.DB_HOST,
      port: _config.DB_PORT,
      user: _config.DB_USER,
      password: _config.DB_PASSWORD,
      name: _config.DB_NAME,
    },
    bcryptSaltRounds: _config.BCRYPT_SALT_ROUNDS,
    redisBlacklistTtl: _config.REDIS_BLACKLIST_TTL,
    resetTokenTtl: _config.RESET_TOKEN_TTL,
  };
}
