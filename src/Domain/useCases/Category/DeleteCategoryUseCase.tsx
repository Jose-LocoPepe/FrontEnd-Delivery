import { CategoryRepositoryImpl } from "../../../Data/repositories/CategoryRepository";
import { Category } from "../../entities/Category";

const { deleteCategory } = new CategoryRepositoryImpl();

export const deleteCategoryUseCase = async (newCategoryData: Category): Promise<void> => {
    try {
        await deleteCategory(newCategoryData);
    } catch (error) {
        throw new Error("Failed todelete category");
    }
};
