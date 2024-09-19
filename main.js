let carrito = [];
let total = 0;

function agregarAlCarrito(id) {
    let producto = {
        id: id,
        nombre: `MousePad FX ${id === 1 ? 'TYPE-99' : id === 2 ? 'HIEN' : 'SHIDENKAI V2'}`,
        precio: id === 1 ? 150 : id === 2 ? 200 : 250,
        cantidad: 1
    };

    let productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push(producto);
    }

    actualizarCarrito();
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
    let carritoHTML = carrito.map(item => `
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
    let cuota = total / cuotas;
    document.getElementById('cuotas').innerHTML = `Cuotas: ${cuotas} x $${cuota.toFixed(2)}`;
}

// Call the function to initialize the cart
actualizarCarrito();