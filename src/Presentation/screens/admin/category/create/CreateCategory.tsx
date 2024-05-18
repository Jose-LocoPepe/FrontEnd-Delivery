import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../../navigator/MainAppStack';
import { useCreateCategoryViewModel } from './ViewModel'; // Import the hook
import { showMessage } from 'react-native-flash-message';

interface Props extends StackScreenProps<RootStackParamsList, 'AdminCategoryBottomTabs'> {}

export const CategoriesCreateScreen = ({ navigation }: Props) => {
    const { loading, createCategory, newCategoryData, setNewCategoryData } = useCreateCategoryViewModel(); // Call the hook to get loading state and createCategory function

    const handleCreateCategory = async () => {
        try {
            const response = await createCategory();
            if (response) {
                showMessage({
                    message: 'Categoría creada correctamente',
                    type: 'success',
                    icon: 'success',
                });
                navigation.goBack();
            } else {
                showMessage({
                    message: 'Error al crear la categoría',
                    type: 'danger',
                    icon: 'danger',
                });
            }
        } catch (error) {
            console.error('Failed to create category:', error);
            showMessage({
                message: 'Error al crear la categoría',
                type: 'danger',
                icon: 'danger',
            });
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>
                Agregar Categoría
            </Text>
            <View style={{ marginBottom: 10 }}>
                <Text>Nombre:</Text>
                <TextInput
                    placeholder="Nombre"
                    value={newCategoryData.name}
                    onChangeText={(text) => setNewCategoryData({ ...newCategoryData, name: text })}
                />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text>Descripción:</Text>
                <TextInput
                    placeholder="Descripción"
                    value={newCategoryData.description}
                    onChangeText={(text) => setNewCategoryData({ ...newCategoryData, description: text })}
                />
            </View>
            <Button
                title="Agregar Categoría"
                onPress={handleCreateCategory} // Invoke the function to create a category
                disabled={loading} // Disable the button while loading
            />
            {loading && <Text>Creating...</Text>}
        </View>
    );
};
