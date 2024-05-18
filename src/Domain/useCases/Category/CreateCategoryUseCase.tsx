import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";

const { createCategory } = new CategoryRepositoryImpl();

export const CreateCategoryUseCase = async (newCategoryData: Category): Promise<void> => {
    try {
        await createCategory(newCategoryData);
    } catch (error) {
        throw new Error("Failed to create category");
    }
};