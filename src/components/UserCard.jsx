import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de edición

const UserCard = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Usa useEffect para actualizar `editedUser` cuando `user` cambie
  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleEditClick = () => {
    // Solo permite la edición si `user.accion` es `true`
    if (user.accion) {
      setIsEditing(!isEditing);
    }
  };

  const handleSaveClick = () => {
    onEdit(editedUser); // Llama al callback para actualizar el usuario en el estado principal
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <article className="user-card">
      <img src={user.foto} alt={`${user.nombre} ${user.apellido}`} />
      <div className="user-card-info">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="nombre"
              value={editedUser.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="apellido"
              value={editedUser.apellido}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <input
              type="text"
              name="empresa"
              value={editedUser.empresa}
              onChange={handleChange}
              placeholder="Empresa"
            />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <h2>{user.nombre} {user.apellido}</h2>
            <p className="empresa"><strong>Company:</strong> {user.empresa}</p>
            <button 
              onClick={handleEditClick} 
              disabled={!user.accion}
              className="edit-button"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;



