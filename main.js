// Base de datos de productos
const productos = [
    { id: 1, nombre: 'MousePad FX TYPE-99', precio: 150 },
    { id: 2, nombre: 'MousePad FX HIEN', precio: 200 },
    { id: 3, nombre: 'MousePad FX SHIDENKAI V2', precio: 250 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = 0;

function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);

    if (producto) {
        let productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        actualizarCarrito();
    }
}

function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
    mostrarCarrito();
    mostrarTotal();
}

function mostrarCarrito() {
    const carritoElement = document.getElementById('carrito');
    if (carritoElement) {
        const carritoHTML = carrito.map(item => `
            <div class="item">
            <p>${item.nombre}</p>
            <p>$${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button onclick="eliminarProducto(${item.id})">Eliminar</button>
            </div>
        `).join('');
        carritoElement.innerHTML = carritoHTML;
    } else {
        console.error("Elemento 'carrito' no encontrado");
    }
}

function mostrarTotal() {
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.innerHTML = `Total: $${total}`;
    } else {
        console.error("Elemento 'total' no encontrado");
    }
}

function calcularCuotas(cuotas) {
    const cuotasElement = document.getElementById('cuotas');
    if (cuotasElement) {
        const cuota = total / cuotas;
        cuotasElement.innerHTML = `Cuotas: ${cuotas} x $${cuota.toFixed(2)}`;
    } else {
        console.error("Elemento 'cuotas' no encontrado");
    }
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);