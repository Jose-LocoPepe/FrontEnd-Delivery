
export interface Product {

    id?: string;
    name: string;
    description: string;
    price: string;
    categoryId: string;
    categoryName?: string;
    isActive?: boolean;

}

export interface ProductImage {

    id?: string;
    image: string;
}