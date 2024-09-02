
import React from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import Filters from './components/Filters';
import Search from './components/Search';
import AddUserModal from './components/AddUserModal';
import './App.css';
import useUsersLogic from './CustomHook/useUsersLogic'

function App() {
  const {
    filteredUsers,
    showModal,
    setShowModal,
    handleEditUser,
    handleSearchChange,
    handleCompanyChange,
    handleAddUser
  }= useUsersLogic()

  return (
    <div>
      <div className="controls">
        <Filters onCompanyChange={handleCompanyChange} />
        <Search onSearchChange={handleSearchChange} />
        <button className="add-new-button" onClick={() => setShowModal(true)}>Add New</button>
      </div>
    <div className="user-list">
        {filteredUsers.map(user => (
          <UserCard key={user.codigo} user={user} onEdit={handleEditUser} />
        ))}
    </div>
{showModal && <AddUserModal onClose={() => setShowModal(false)} onAddUser={handleAddUser} />}

    </div>
  );
}

export default App;




