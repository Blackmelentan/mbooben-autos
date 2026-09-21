// MBOOBEN AUTO'S — Admin panel logic
// Local password (change this). Later: Supabase Auth.

const ADMIN_PASSWORD = 'mbooben2026';
const STORAGE_KEY = 'mbooben_cars';

function loadCars() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Fallback to built-in inventory
  return typeof CARS !== 'undefined' ? JSON.parse(JSON.stringify(CARS)) : [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function isLoggedIn() {
  return sessionStorage.getItem('mbooben_admin') === '1';
}

function login(pw) {
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem('mbooben_admin', '1');
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('mbooben_admin');
  location.reload();
}

function formatPrice(n) {
  return 'D ' + Number(n).toLocaleString('en-US');
}

function renderAdmin() {
  const cars = loadCars();
  const tbody = document.getElementById('carsTableBody');
  if (!tbody) return;

  tbody.innerHTML = cars.map((c, i) => `
    <tr>
      <td><strong>${c.year || ''} ${c.make} ${c.model}</strong><br><small style="color:#888">${c.color || ''}</small></td>
      <td>${formatPrice(c.price)}</td>
      <td><span class="status status-${c.status || 'available'}">${c.status || 'available'}</span></td>
      <td>${c.featured ? '★' : '—'}</td>
      <td class="actions">
        <button type="button" class="btn-sm" onclick="editCar(${i})">Edit</button>
        <button type="button" class="btn-sm btn-danger" onclick="deleteCar(${i})">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5">No cars yet. Add one below.</td></tr>';

  document.getElementById('carCount').textContent = cars.length;
  document.getElementById('availableCount').textContent = cars.filter(c => c.status === 'available').length;
}

function editCar(index) {
  const cars = loadCars();
  const c = cars[index];
  if (!c) return;
  document.getElementById('formTitle').textContent = 'Edit vehicle';
  document.getElementById('editIndex').value = index;
  document.getElementById('f_id').value = c.id || '';
  document.getElementById('f_make').value = c.make || '';
  document.getElementById('f_model').value = c.model || '';
  document.getElementById('f_year').value = c.year || '';
  document.getElementById('f_price').value = c.price || '';
  document.getElementById('f_color').value = c.color || '';
  document.getElementById('f_plate').value = c.plate || '';
  document.getElementById('f_status').value = c.status || 'available';
  document.getElementById('f_featured').checked = !!c.featured;
  document.getElementById('f_description').value = c.description || '';
  document.getElementById('f_images').value = (c.images || []).join('\n');
  document.getElementById('carForm').scrollIntoView({ behavior: 'smooth' });
}

function deleteCar(index) {
  if (!confirm('Delete this vehicle?')) return;
  const cars = loadCars();
  cars.splice(index, 1);
  saveCars(cars);
  renderAdmin();
  resetForm();
}

function resetForm() {
  document.getElementById('formTitle').textContent = 'Add vehicle';
  document.getElementById('editIndex').value = '';
  document.getElementById('carForm').reset();
  document.getElementById('f_status').value = 'available';
}

function slugId(make, model, year) {
  return `${(make || 'car')}-${(model || 'x')}-${year || Date.now()}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

document.addEventListener('DOMContentLoaded', () => {
  const loginBox = document.getElementById('loginBox');
  const adminApp = document.getElementById('adminApp');

  if (!isLoggedIn()) {
    loginBox.style.display = 'block';
    adminApp.style.display = 'none';
  } else {
    loginBox.style.display = 'none';
    adminApp.style.display = 'block';
    renderAdmin();
  }

  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const pw = document.getElementById('password').value;
    if (login(pw)) {
      loginBox.style.display = 'none';
      adminApp.style.display = 'block';
      renderAdmin();
    } else {
      document.getElementById('loginError').textContent = 'Wrong password';
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  document.getElementById('carForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const cars = loadCars();
    const idx = document.getElementById('editIndex').value;
    const imagesRaw = document.getElementById('f_images').value.trim();
    const images = imagesRaw
      ? imagesRaw.split(/\n/).map(s => s.trim()).filter(Boolean)
      : ['images/charger-2.jpg'];

    const car = {
      id: document.getElementById('f_id').value.trim() || slugId(
        document.getElementById('f_make').value,
        document.getElementById('f_model').value,
        document.getElementById('f_year').value
      ),
      make: document.getElementById('f_make').value.trim(),
      model: document.getElementById('f_model').value.trim(),
      year: parseInt(document.getElementById('f_year').value, 10) || null,
      price: parseFloat(document.getElementById('f_price').value) || 0,
      currency: 'GMD',
      color: document.getElementById('f_color').value.trim(),
      plate: document.getElementById('f_plate').value.trim(),
      transmission: 'Automatic',
      fuel: 'Petrol',
      status: document.getElementById('f_status').value,
      featured: document.getElementById('f_featured').checked,
      images,
      description: document.getElementById('f_description').value.trim()
    };

    if (idx === '') {
      cars.push(car);
    } else {
      cars[parseInt(idx, 10)] = car;
    }
    saveCars(cars);
    renderAdmin();
    resetForm();
    alert('Saved. Public site will use localStorage data when open in same browser. For live site, connect Supabase.');
  });

  document.getElementById('resetFormBtn')?.addEventListener('click', resetForm);

  // Export JSON for backup
  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const data = JSON.stringify(loadCars(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mbooben-cars-backup.json';
    a.click();
  });
});
