
import { useEffect ,useState } from 'react';
import axios from 'axios';

function useUsersLogic() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const url = 'https://66d473ff5b34bcb9ab3ea3ac.mockapi.io/api/talentoCloud/datos';
    axios.get(url)
      .then(res => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(err => console.log('Error fetching data:', err));
  }, []);

  const handleEditUser = (editedUser) => {
    setUsers(users.map(user =>
      user.codigo === editedUser.codigo ? editedUser : user
    ));
    setFilteredUsers(filteredUsers.map(user =>
      user.codigo === editedUser.codigo ? editedUser : user
    ));
    // Envía la actualización al backend
    axios.put(`https://66d473ff5b34bcb9ab3ea3ac.mockapi.io/api/talentoCloud/datos/${editedUser.codigo}`, editedUser)
      .then(res => console.log('Usuario actualizado:', res.data))
      .catch(err => console.log('Error actualizando usuario:', err));
  };
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterUsers(selectedCompany, query);
  };
  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
    filterUsers(company, searchQuery);
  };
  const filterUsers = (company, query) => {
    const filtered = users.filter(user =>
      (company === 'All' || user.empresa === company) &&
      (user.nombre.toLowerCase().includes(query.toLowerCase()) ||
       user.apellido.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = (user) => {
    axios.post('https://66d473ff5b34bcb9ab3ea3ac.mockapi.io/api/talentoCloud/datos', user)
      .then(res => {
        setUsers([...users, res.data]);
        setFilteredUsers([...filteredUsers, res.data]);
        setShowModal(false);
      })
      .catch(err => console.log('Error adding user:', err));
  };
  
  return {
        users,
        setUsers,
        filteredUsers,
        setFilteredUsers,
        selectedCompany,
        setSelectedCompany,
        searchQuery,
        setSearchQuery,
        showModal,
        setShowModal,
        handleEditUser,
        handleSearchChange,
        handleCompanyChange,
        handleAddUser
    }

}

export default useUsersLogic