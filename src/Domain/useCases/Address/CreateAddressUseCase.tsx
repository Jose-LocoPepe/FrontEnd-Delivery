import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository";

const { createAddress } = new AddressRepositoryImpl();

export const CreateAddressUseCase = async (id: string, name: string, street: string, neighborhood: string, longitude: number, latitude: number, session_token: string) => {
    return await createAddress(id, name, street, neighborhood, longitude, latitude, session_token);
}