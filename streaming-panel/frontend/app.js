let plataformas = [];
let modoEdicion = false;
let idEditando = null;

function abrirModal(modo, plataforma = null) {
  modoEdicion = modo === 'editar';
  idEditando = modoEdicion && plataforma ? plataforma._id : null;
  const modal = document.getElementById('modalPlataforma');
  const titulo = document.getElementById('modalTitulo');
  const form = document.getElementById('formPlataforma');
  const cuentasContainer = document.getElementById('cuentasContainer');

  titulo.textContent = modoEdicion ? 'Editar Plataforma' : 'Agregar Plataforma';
  form.reset();
  cuentasContainer.innerHTML = `<div class="section-divider">Cuentas</div>`;

  if (modoEdicion && plataforma) {
    document.getElementById('nombrePlataforma').value = plataforma.nombre || '';
    (plataforma.cuentas || []).forEach(cuenta => {
      agregarCuenta(cuentasContainer, cuenta);
    });
  } else {
    agregarCuenta(cuentasContainer);
  }
  modal.style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalPlataforma').style.display = 'none';
}

function agregarCuenta(container = null, cuentaData = null) {
  if (!container) container = document.getElementById('cuentasContainer');
  const cuentaId = Date.now() + Math.random().toString(36).substr(2, 5);
  const cuentaDiv = document.createElement('div');
  cuentaDiv.className = 'cuenta-container';
  cuentaDiv.dataset.cuentaId = cuentaId;
  cuentaDiv.innerHTML = `
    <button type="button" class="remove-btn" title="Eliminar cuenta" onclick="eliminarElemento(this)">×</button>
    <label>Plataforma (ej. Netflix):</label>
    <input type="text" class="input-plataforma" required value="${cuentaData?.plataforma || ''}" />
    <label>Fecha inicio:</label>
    <input type="date" class="input-fecha-inicio" required value="${cuentaData?.fechaInicio ? cuentaData.fechaInicio.split('T')[0] : ''}" onchange="calcularDias(this.closest('.cuenta-container'))" />
    <label>Fecha vencimiento:</label>
    <input type="date" class="input-fecha-vencimiento" value="${cuentaData?.fechaVencimiento ? cuentaData.fechaVencimiento.split('T')[0] : ''}" onchange="calcularDias(this.closest('.cuenta-container'))" />
    <label>Días activos:</label>
    <input type="text" class="input-dias-activos" readonly value="${cuentaData?.diasActivos || ''}" />
    <label>Días restantes:</label>
    <input type="text" class="input-dias-restantes" readonly value="${cuentaData?.diasRestantes || ''}" />
    <label>Estado:</label>
    <select class="input-estado" required>
      <option value="activa" ${cuentaData?.estado === 'activa' ? 'selected' : ''}>Activa</option>
      <option value="vencida" ${cuentaData?.estado === 'vencida' ? 'selected' : ''}>Vencida</option>
    </select>
    <div class="section-divider">Perfiles</div>
    <div class="perfiles-container"></div>
    <button type="button" class="btn-add btn-small" onclick="agregarPerfil(this)">+ Agregar perfil</button>
  `;
  container.appendChild(cuentaDiv);
  if (cuentaData?.perfiles && cuentaData.perfiles.length > 0) {
    const perfilesContainer = cuentaDiv.querySelector('.perfiles-container');
    cuentaData.perfiles.forEach(perfil => {
      agregarPerfil(null, perfilesContainer, perfil);
    });
  }
}

function agregarPerfil(btnOpcional = null, containerOpcional = null, perfilData = null) {
  let container;
  if (containerOpcional) {
    container = containerOpcional;
  } else if (btnOpcional) {
    container = btnOpcional.previousElementSibling;
  } else {
    return;
  }
  const perfilDiv = document.createElement('div');
  perfilDiv.className = 'perfil-container';
  perfilDiv.innerHTML = `
    <button type="button" class="remove-btn" title="Eliminar perfil" onclick="eliminarElemento(this)">×</button>
    <label>Nombre usuario:</label>
    <input type="text" class="input-nombre-usuario" required value="${perfilData?.nombreUsuario || ''}" />
    <label>PIN:</label>
    <input type="text" class="input-pin" required maxlength="10" value="${perfilData?.pin || ''}" />
  `;
  container.appendChild(perfilDiv);
}

function eliminarElemento(btn) {
  if (confirm('¿Estás seguro de eliminar este elemento?')) {
    btn.parentElement.remove();
  }
}

function calcularDias(cuentaDiv) {
  const fechaInicioInput = cuentaDiv.querySelector('.input-fecha-inicio');
  const fechaVencimientoInput = cuentaDiv.querySelector('.input-fecha-vencimiento');
  const diasActivosInput = cuentaDiv.querySelector('.input-dias-activos');
  const diasRestantesInput = cuentaDiv.querySelector('.input-dias-restantes');
  const hoy = new Date();
  const fechaInicio = fechaInicioInput.value ? new Date(fechaInicioInput.value) : null;
  const fechaVencimiento = fechaVencimientoInput.value ? new Date(fechaVencimientoInput.value) : null;
  if (!fechaInicio) {
    diasActivosInput.value = '';
    diasRestantesInput.value = '';
    return;
  }
  let diasActivos = Math.floor((hoy - fechaInicio) / (1000 * 60 * 60 * 24));
  if (diasActivos < 0) diasActivos = 0;
  let diasRestantes = '';
  if (fechaVencimiento) {
    diasRestantes = Math.floor((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
    if (diasRestantes < 0) diasRestantes = 0;
  }
  diasActivosInput.value = diasActivos;
  diasRestantesInput.value = diasRestantes;
}

function validarFormulario() {
  const nombrePlataforma = document.getElementById('nombrePlataforma').value.trim();
  if (!nombrePlataforma) {
    alert('El nombre de la plataforma es obligatorio.');
    return false;
  }
  const cuentaContainers = document.querySelectorAll('.cuenta-container');
  if (cuentaContainers.length === 0) {
    alert('Debes agregar al menos una cuenta.');
    return false;
  }
  for (const cuenta of cuentaContainers) {
    const plataforma = cuenta.querySelector('.input-plataforma').value.trim();
    const fechaInicio = cuenta.querySelector('.input-fecha-inicio').value;
    const estado = cuenta.querySelector('.input-estado').value;
    if (!plataforma || !fechaInicio || !estado) {
      alert('Todos los campos de la cuenta son obligatorios.');
      return false;
    }
    const perfiles = cuenta.querySelectorAll('.perfil-container');
    if (perfiles.length === 0) {
      alert('Cada cuenta debe tener al menos un perfil.');
      return false;
    }
    for (const perfil of perfiles) {
      const nombreUsuario = perfil.querySelector('.input-nombre-usuario').value.trim();
      const pin = perfil.querySelector('.input-pin').value.trim();
      if (!nombreUsuario || !pin) {
        alert('Todos los campos de perfil son obligatorios.');
        return false;
      }
    }
  }
  return true;
}

function obtenerDatosFormulario() {
  const nombrePlataforma = document.getElementById('nombrePlataforma').value.trim();
  const cuentaContainers = document.querySelectorAll('.cuenta-container');
  const cuentas = [];
  cuentaContainers.forEach(cuenta => {
    const plataforma = cuenta.querySelector('.input-plataforma').value.trim();
    const fechaInicio = cuenta.querySelector('.input-fecha-inicio').value;
    const fechaVencimiento = cuenta.querySelector('.input-fecha-vencimiento').value;
    const diasActivos = Number(cuenta.querySelector('.input-dias-activos').value) || 0;
    const diasRestantes = Number(cuenta.querySelector('.input-dias-restantes').value) || 0;
    const estado = cuenta.querySelector('.input-estado').value;
    const perfilesElems = cuenta.querySelectorAll('.perfil-container');
    const perfiles = [];
    perfilesElems.forEach(perfil => {
      perfiles.push({
        nombreUsuario: perfil.querySelector('.input-nombre-usuario').value.trim(),
        pin: perfil.querySelector('.input-pin').value.trim(),
      });
    });
    cuentas.push({
      plataforma,
      fechaInicio,
      fechaVencimiento: fechaVencimiento || null,
      diasActivos,
      diasRestantes,
      estado,
      perfiles,
    });
  });
  return {
    nombre: nombrePlataforma,
    cuentas,
  };
}

async function guardarPlataforma(event) {
  event.preventDefault();
  if (!validarFormulario()) return;
  const datos = obtenerDatosFormulario();
  const token = localStorage.getItem('token');
  try {
    let res;
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (modoEdicion && idEditando) {
      res = await fetch(`http://localhost:3000/api/plataformas/${idEditando}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(datos),
      });
    } else {
      res = await fetch('http://localhost:3000/api/plataformas', {
        method: 'POST',
        headers,
        body: JSON.stringify(datos),
      });
    }
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error guardando plataforma');
    }
    alert(`Plataforma ${modoEdicion ? 'actualizada' : 'creada'} con éxito.`);
    cerrarModal();
    cargarPlataformas();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

async function cargarPlataformas() {
  const token = localStorage.getItem('token');
  try {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch('http://localhost:3000/api/plataformas', {
      headers,
    });
    if (!res.ok) throw new Error('Error cargando plataformas');
    plataformas = await res.json();
    mostrarPlataformasTabla(plataformas);
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

function mostrarPlataformasTabla(plataformas) {
  const tabla = document.getElementById('tablaPlataformas');
  const cuerpo = document.getElementById('cuerpoTabla');
  cuerpo.innerHTML = '';
  if (plataformas.length === 0) {
    tabla.style.display = 'none';
    alert('No hay plataformas para mostrar.');
    return;
  }
  plataformas.forEach(plataforma => {
    const tr = document.createElement('tr');
    const tdNombre = document.createElement('td');
    tdNombre.textContent = plataforma.nombre || '';
    const tdCuentas = document.createElement('td');
    if (plataforma.cuentas && plataforma.cuentas.length > 0) {
      tdCuentas.innerHTML = plataforma.cuentas.map(c => {
        const cantidadPerfiles = c.perfiles ? c.perfiles.length : 0;
        return `<div>${c.plataforma} (${c.estado}) - ${cantidadPerfiles} perfil(es)</div>`;
      }).join('');
    } else {
      tdCuentas.textContent = 'Sin cuentas';
    }
    const tdAcciones = document.createElement('td');
    const btnEditar = document.createElement('button');
    btnEditar.className = 'action-btn edit-btn';
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => abrirModal('editar', plataforma);
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'action-btn delete-btn';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => eliminarPlataforma(plataforma._id);
    tdAcciones.appendChild(btnEditar);
    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdNombre);
    tr.appendChild(tdCuentas);
    tr.appendChild(tdAcciones);
    cuerpo.appendChild(tr);
  });
  tabla.style.display = 'table';
}

async function eliminarPlataforma(id) {
  const token = localStorage.getItem('token');
  if (!confirm('¿Estás seguro de eliminar esta plataforma?')) return;
  try {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`http://localhost:3000/api/plataformas/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error eliminando plataforma');
    }
    alert('Plataforma eliminada con éxito.');
    cargarPlataformas();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

function cerrarSesion() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
