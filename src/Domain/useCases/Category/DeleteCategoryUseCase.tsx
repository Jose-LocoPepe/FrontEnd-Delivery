import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";

const { deleteCategory } = new CategoryRepositoryImpl();

export const deleteCategoryUseCase = async (id: string, token: string): Promise<void> => {
    try {
        await deleteCategory(id, token);
    } catch (error) {
        throw new Error("Failed to delete category");
    }
};
