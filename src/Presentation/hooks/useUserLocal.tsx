import React, { useEffect, useState } from 'react'
import { User } from '../../Domain/entities/User';
import { GetUserUseCase } from '../../Domain/useCases/UserLocal/GetUserLocal';

export const useUserLocal = () => {

  const [user, setUser] = useState<User>()

  useEffect(() => {
      getUserSession();
  }, [])

  const getUserSession = async() =>  {
      const user = await GetUserUseCase();
      setUser(user);
  }

  return { 
    user,
    getUserSession 
  }
}
