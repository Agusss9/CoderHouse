import React, { forwardRef } from 'react'; // Correcto
import { useColorMode, Center } from "@chakra-ui/react"; // Importación correcta de Chakra UI
import { MoonIcon, SunIcon } from "@chakra-ui/icons"; // Importación de iconos
import CartWidget from "./CartWidget"; // Asegúrate de que esta ruta sea correcta

const ItemListContainer = () => {
    const { colorMode, toggleColorMode } = useColorMode(); // Manejo del modo de color

    return (
        <Center>
            <button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />} {/* Cambia el icono según el modo de color */}
            </button>
            <h1>Nuestros Productos</h1>
            <CartWidget /> {/* Asegúrate de que este componente esté correctamente importado */}
        </Center>
    );
};

export default ItemListContainer;