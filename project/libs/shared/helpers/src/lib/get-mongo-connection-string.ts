export interface GetMongoConnectionString {
  username: string;
  password: string;
  host: string;
  port: number;
  databaseName: string;
  authDatabase: string;
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}: GetMongoConnectionString): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
