
export interface Product {

    id?: string;
    name: string;
    description: string;
    price: string;
    categoryId: string;
    categoryName?: string;
    isActive?: boolean;
    images?: ProductImage[]; // Agregar esta línea
}

export interface ProductImage {

    id?: string;
    image: string;
}