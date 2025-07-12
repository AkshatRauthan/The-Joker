import CrudRepository from '@repositories/crud.repository';
import { User } from '@models';
import { IUser } from '@types';

class UserRepository extends CrudRepository<IUser> {
    constructor() {
        super(User);
    }

    /**
     * Find a user by email
     * @param email - User email
     * @returns User document
     */
    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.log("Something went wrong in User repository: findByEmail");
            throw error;
        }
    }

    /**
     * Find a user by username
     * @param username - Username
     * @returns User document
     */
    async findByUsername(username: string): Promise<IUser | null> {
        try {
            const user = await User.findOne({ username });
            return user;
        } catch (error) {
            console.log("Something went wrong in User repository: findByUsername");
            throw error;
        }
    }
}

export default UserRepository;
