


import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";

const { getCategories } = new CategoryRepositoryImpl();

export const GetCategorysUseCase = async (): Promise<Category[]> => {

    return await getCategories();
}