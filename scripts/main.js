// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    // Elementos del DOM
    const carritoElement = document.getElementById('carrito');
    const totalElement = document.getElementById('total');
    const cuotasSelect = document.getElementById('cuotas-select');
    const cuotasElement = document.getElementById('cuotas');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    // Productos disponibles
    const productos = [
        { id: 1, nombre: "MousePad FX TYPE-99", precio: 150 },
        { id: 2, nombre: "MousePad FX HIEN", precio: 200 },
        { id: 3, nombre: "MousePad FX SHIDENKAI V2", precio: 300 }
    ];

    // Función para actualizar el carrito
    function actualizarCarrito() {
        if (!carritoElement || !totalElement) return;

        carritoElement.innerHTML = '';
        total = 0;

        carrito.forEach(item => {
            const producto = productos.find(p => p.id === item.id);
            if (producto) {
                total += producto.precio;
                carritoElement.innerHTML += `${producto.nombre} - $${producto.precio}<br>`;
            }
        });

        totalElement.textContent = `Total: $${total}`;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        if (cuotasSelect) {
            calcularCuotas(cuotasSelect.value);
        }
    }

    // Función para agregar al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            carrito.push({ id: producto.id });
            actualizarCarrito();
            
            Swal.fire({
                title: '¡Producto agregado!',
                text: `${producto.nombre} se agregó al carrito`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }

    // Función para calcular cuotas
    function calcularCuotas(cantidadCuotas) {
        if (!cuotasElement || total === 0) return;
        
        const valorCuota = total / parseInt(cantidadCuotas);
        cuotasElement.textContent = `${cantidadCuotas} cuotas de $${valorCuota.toFixed(2)}`;
    }

// Función para vaciar el carrito
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminaran todos los productos del carrito",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarCarrito();
            if (cuotasElement) {
                cuotasElement.textContent = '';
            }
            Swal.fire(
                '¡Carrito vaciado!',
                'Tu carrito ha sido vaciado exitosamente',
                'success'
            );
        }
    });
}

    // Event Listeners
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            agregarAlCarrito(id);
        });
    });

    if (cuotasSelect) {
        cuotasSelect.addEventListener('change', (e) => {
            calcularCuotas(e.target.value);
        });
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    // Inicializar el carrito al cargar la página
    actualizarCarrito();
});