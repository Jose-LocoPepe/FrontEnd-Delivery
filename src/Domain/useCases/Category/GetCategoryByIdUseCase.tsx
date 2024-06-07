import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";

const { getCategoryById } = new CategoryRepositoryImpl();

export const GetCategoryIdUseCase = async (id: string, token: string) => {
    return await getCategoryById(id, token);
}
