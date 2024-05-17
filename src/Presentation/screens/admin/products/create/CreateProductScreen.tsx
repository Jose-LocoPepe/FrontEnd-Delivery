import React from "react";
import { View, Text, TextInput, Button } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "../../../../navigator/MainAppStack";
import { useCreateProductViewModel } from './ViewModel'; // Import the hook
import { showMessage } from 'react-native-flash-message';

interface Props extends StackScreenProps<RootStackParamsList, 'AdminProductBottomTabs'> {}

export const ProductsCreateScreen = ({ navigation }: Props) => {
    const { loading, createProduct, newProductData, setNewProductData } = useCreateProductViewModel(); // Call the hook to get loading state and createProduct function

    const handleCreateProduct = async () => {
        try {
            const response = await createProduct();
            if (response) {
                showMessage({
                  message: 'Producto creado correctamente',
                  type: 'success',
                  icon: 'success',
                });
                navigation.goBack();
            } else {
                showMessage({
                    message: 'Error al crear el producto',
                    type: 'danger',
                    icon: 'danger',
                });
            }
        } catch (error) {
            console.error("Failed to create product:", error);
            showMessage({
                message: 'Error al crear el producto',
                type: 'danger',
                icon: 'danger',
            });
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Agregar Producto
            </Text>
            <View style={{ marginBottom: 10 }}>
                <Text>Nombre:</Text>
                <TextInput
                    placeholder="Nombre"
                    value={newProductData.name}
                    onChangeText={(text) => setNewProductData({ ...newProductData, name: text })}
                />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text>Descripción:</Text>
                <TextInput
                    placeholder="Descripción"
                    value={newProductData.description}
                    onChangeText={(text) => setNewProductData({ ...newProductData, description: text })}
                />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text>Precio:</Text>
                <TextInput
                    placeholder="Precio"
                    keyboardType="numeric"
                    value={newProductData.price.toString()}
                    onChangeText={(text) => {
                        const price = parseFloat(text);
                        setNewProductData({ ...newProductData, price: isNaN(price) ? 0 : Math.min(Math.max(price, 0), 999999) });
                    }}
                />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text>Categoría ID:</Text>
                <TextInput
                    placeholder="Categoría ID"
                    keyboardType="numeric"
                    value={newProductData.categoryid.toString()}
                    onChangeText={(text) => {
                        const categoryid = parseInt(text);
                        setNewProductData({ ...newProductData, categoryid: isNaN(categoryid) ? 1 : categoryid });
                    }}
                />
            </View>
            <Button
                title="Agregar Producto"
                onPress={handleCreateProduct} // Invoke the function to create a product
                disabled={loading} // Disable the button while loading
            />
            {loading && <Text>Creating...</Text>}
        </View>
    );
};