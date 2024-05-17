import { UserUpdateRepositoryImpl } from "../../../Data/repositories/UserUpdateRepository";

const { changePassword } = new UserUpdateRepositoryImpl();

export const ChangePasswordUseCase = async (id: string, currentPassword: string, newPassword: string, session_token: string) => {
    return await changePassword(id, currentPassword, newPassword, session_token);
}