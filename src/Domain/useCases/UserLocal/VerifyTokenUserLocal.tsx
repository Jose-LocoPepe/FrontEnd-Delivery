import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const {verifyToken} = new UserLocalRepositoryImpl();

export const VerifyTokenUseCase  = async(token: any) => {
    return verifyToken(token);
}