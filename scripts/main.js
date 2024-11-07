    // Inicializar el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    let productos = [];

    // Elementos del DOM
    const carritoElement = document.getElementById('carrito');
    const totalElement = document.getElementById('total');
    const cuotasSelect = document.getElementById('cuotas-select');
    const cuotasElement = document.getElementById('cuotas');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const productosContainer = document.querySelector('.card-producs');

    // Cargar productos usando fetch
    fetch('../data/productos.json')  // Cambia a esta ruta
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos cargados:', data);
        productos = data.productos;
        mostrarProductos();
        actualizarCarrito();
    })
    .catch(error => {
        console.error('Error detallado:', error);
        Swal.fire({
            title: 'Error',
            text: `No se pudieron cargar los productos: ${error.message}`,
            icon: 'error'
        });
    });

    // Función para mostrar productos en la página
    function mostrarProductos() {
        if (!productosContainer) return;
    
        const imagenes = {
            1: 'artisantype-99.png',
            2: 'artisanhien.png',
            3: 'artisanSHIDENKAIV2.png'
        };
    
        productosContainer.innerHTML = productos.map(producto => `
            <div class="col card-container">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <img src="../imagenes/${imagenes[producto.id]}" 
                             class="card-img-top" 
                             alt="${producto.nombre}"
                             onerror="this.onerror=null; this.src='../imagenes/imagen_no_disponible.png';">
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">Precio: $${producto.precio}</p>
                    </div>
                    <div class="card-footer">
                        <button class="agregar-carrito" data-id="${producto.id}">
                            Agregar ${producto.nombre}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    
        // Agregar event listeners a los botones
        document.querySelectorAll('.agregar-carrito').forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.dataset.id);
                agregarAlCarrito(id);
            });
        });
    }

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


