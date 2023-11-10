import { Mongoose } from 'mongoose';
import { mongooseConnection } from '@/shared/infrastructure/database/mongoose.database';

describe('Database', () => {
  it('Should return connection', async () => {
    const connection: any = await mongooseConnection();
    expect(connection).toBeDefined();
    expect(connection).toBeInstanceOf(Mongoose);
    expect(connection.connection.readyState).toStrictEqual(1);
  });
});
