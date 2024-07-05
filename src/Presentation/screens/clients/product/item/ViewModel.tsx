import React, { useState, useEffect, useContext } from 'react'
import { Product } from '../../../../../Domain/entities/Product';
import { ShoppingBagContext } from '../../../../context/ShoppingBag/ShoppingBagContext';
import { add } from 'react-native-reanimated';

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [
        product.images[0].image,
        product.images[1].image,
        product.images[2].image,
    ];
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0.0);
    const { shoppingBag, saveItem } = useContext(ShoppingBagContext);
    //console.log('BOLSA DE COMPRAS: ' + JSON.stringify(shoppingBag));
    const [productImage, setProductImage] = useState<string>('');


    const addImage = (image: string) => {
        setProductImage(image);
    }

   
    useEffect(() => {
        const index = shoppingBag.findIndex((p) => p.id == product.id);
        if (index !== -1) { // PRODUCTO SI EXISTE 
            setQuantity(shoppingBag[index].quantity!);
        }

    }, [shoppingBag])
    
    useEffect(() => {
        setPrice(product.price * quantity);
    }, [quantity])
    
    const addToBag = () => {
        if (quantity > 0) {
            product.quantity = quantity;
            saveItem(product);
        }
    }

    const addItem = () => {
        setQuantity(quantity + 1);
    }
    
    const removeItem = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    return {
        quantity,
        price,
        productImageList,
        shoppingBag,
        addItem,
        addToBag,
        removeItem
    }
}

export default ClientProductDetailViewModel;
