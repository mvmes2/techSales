import { User } from "@app/entities/user/user";

export class UserViewModel {
    static toHTTP (user: User) {
        return {
            id: user.id,
            name: user.user_name,
            email: user.user_email.value,
            created_at: user.created_at,
        }
    }
}