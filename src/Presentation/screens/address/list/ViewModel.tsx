import React, { useState, useContext, useEffect } from 'react'
import { Address } from '../../../../../src/Domain/entities/Address';
import { UserContext } from '../../../../Presentation/context/auth/UserContext';
import { GetByUserAddress } from '../../../../Domain/useCases/Address/GetByUserAddress';
const ClientAddressListViewModel = () => {

    const [address, setAddress] = useState<Address[]>([]);
    
    //SaveUserUseCase
    /* */
    const { user, updateUser } = useContext(UserContext);
    const [checked, setChecked] = useState('');
    
    const changeRadioValue = async (address: Address) => {
        setChecked(address.id!);
        user.address = address;
        await updateUser(user);
    } 
    const getAddress = async () => {
        try {
            const response = await GetByUserAddress(user.id);
            if(response.success){
                setAddress(response.data);
            }
        } catch (error) {
            
            console.error("Failed to update categories:", error);
        } finally {
            
        }
    }
    useEffect(() => {
        getAddress();
        if (user.address !== null && user.address !== undefined) {
            changeRadioValue(user.address!);
            console.log('USUARIO CON DIRECCION: ' + JSON.stringify(user));
        }
    }, [user])

    return {
        getAddress,
        address,
        checked,
        changeRadioValue
        
    }

}

export default ClientAddressListViewModel;