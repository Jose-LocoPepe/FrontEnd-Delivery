import { useContext } from "react"
import { UserContext } from "../../../context/auth/UserContext"
import { RemoveUserUseCase } from "../../../../Domain/useCases/UserLocal/RemoveUserLocal";




const ProfileInfoViewModel = () => {

    const { user, logout } = useContext(UserContext);


    const logoutUser = async () => {
        await RemoveUserUseCase();
        logout();
    }

    return {
        user,
        logoutUser
    }
}

export default ProfileInfoViewModel;