import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";

const { createCategory } = new CategoryRepositoryImpl();

export const CreateCategoryUseCase = async (category: Category, token: string) => {
    return await createCategory(category, token);
};