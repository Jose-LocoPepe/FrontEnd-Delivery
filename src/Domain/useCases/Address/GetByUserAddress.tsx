import { AddressRepositoryImpl } from "../../../Data/repositories/AddressRepository";
import { Address } from "../../entities/Address";

const { getAddressById } = new AddressRepositoryImpl();

export const GetByUserAddress = async (id: string) => {
    return await getAddressById(id);
};