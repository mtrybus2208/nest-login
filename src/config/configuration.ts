export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME || 'test',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
});
