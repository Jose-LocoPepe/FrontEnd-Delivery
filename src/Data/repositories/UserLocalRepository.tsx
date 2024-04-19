import { User } from '../../Domain/entities/User';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';

export class UserLocalRepositoryImpl implements UserLocalRepository {


    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
<<<<<<< HEAD
=======
        console.log('Saved to storage');
>>>>>>> 6c24dde (Se arreglan las vistas, tiene comunicacion con el servidor backend haciendo funciones principales como "Loguear" y "Registrar")
        await save('user', JSON.stringify(user));
    }

    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');
        const user: User = JSON.parse(data as any);
        return user;
    }

    async removeItem(): Promise<void> {
        const { removeItem } = LocalStorage();
        await removeItem('user');
    }

}