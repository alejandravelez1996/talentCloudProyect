import { useState } from 'react';

const AddUserModal = ({ onClose, onAddUser }) => {
  // Estado inicial del nuevo usuario sin el campo 'codigo'
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    foto: '',
    accion: true // Campo adicional para la acción
  });

  const [error, setError] = useState('');

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Validar el formulario antes de enviar, sin el campo 'codigo'
  const validateForm = () => {
    const { nombre, apellido, empresa, foto } = newUser;
    if (!nombre || !apellido || !empresa || !foto) {
      setError('All fields are required except the "Código".');
      return false;
    }
    setError('');
    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onAddUser(newUser);
      setNewUser({
        nombre: '',
        apellido: '',
        empresa: '',
        foto: '',
        accion: true // Restablecer el estado a su valor inicial
      });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New User</h2>
        {error && <div className="error">{error}</div>}
        <label>
          Nombre:
          <input type="text" name="nombre" value={newUser.nombre} onChange={handleChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" value={newUser.apellido} onChange={handleChange} />
        </label>
        <label>
          Empresa:
          <input type="text" name="empresa" value={newUser.empresa} onChange={handleChange} />
        </label>
        <label>
          Foto URL:
          <input type="text" name="foto" value={newUser.foto} onChange={handleChange} />
        </label>
        {/* El campo 'codigo' ha sido eliminado del formulario */}
        <label>
          Acción:
          <select name="accion" value={newUser.accion} onChange={(e) => setNewUser(prevState => ({ ...prevState, accion: e.target.value === 'true' }))}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </label>
        <button onClick={handleSubmit}>Add User</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddUserModal;
