import { connectToDb } from '../common/db';

async function dbLoader(): Promise<void> {
    await connectToDb();
}

export default dbLoader;
