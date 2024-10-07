// Base de datos de productos
const productos = [
    { id: 1, nombre: 'MousePad FX TYPE-99', precio: 150 },
    { id: 2, nombre: 'MousePad FX HIEN', precio: 200 },
    { id: 3, nombre: 'MousePad FX SHIDENKAI V2', precio: 250 }
];

let carrito = [];
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
    mostrarCarrito();
    mostrarTotal();
}

function mostrarCarrito() {
    const carritoHTML = carrito.map(item => `
        <div class="item">
        <p>${item.nombre}</p>
        <p>$${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <button onclick="eliminarProducto(${item.id})">Eliminar</button>
        </div>
    `).join('');

    document.getElementById('carrito').innerHTML = carritoHTML;
}

function mostrarTotal() {
    document.getElementById('total').innerHTML = `Total: $${total}`;
}

function calcularCuotas(cuotas) {
    const cuota = total / cuotas;
    document.getElementById('cuotas').innerHTML = `Cuotas: ${cuotas} x $${cuota.toFixed(2)}`;
}

  // Inicializar el carrito al cargar la página
actualizarCarrito();
