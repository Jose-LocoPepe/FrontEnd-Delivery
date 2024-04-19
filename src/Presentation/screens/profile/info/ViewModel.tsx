import React, { useContext } from 'react'
import { RemoveUserUseCase } from '../../../../Domain/useCases/UserLocal/RemoveUserLocal'
import { UserContext } from '../../../../Presentation/context/UserContext'

const ProfileInfoViewModel = () => {

    const { user, removeUserSession } = useContext (UserContext);

    return {
        removeUserSession,
        user
    }
}

export default ProfileInfoViewModel;