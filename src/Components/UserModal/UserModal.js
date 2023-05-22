import { useDispatch, useSelector } from 'react-redux';
import './UserModal.css';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../Store/UsersReducer';

const UserModal = (props) => {

  const activeUser = useSelector(state => state.users.activeUser);
  const users = useSelector(state => state.users.users);
  const displayUsers = users.filter((item) => activeUser.id !== item.id).slice(0, 2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate('/');
  }

  const handleUserClick = (item) => {
    dispatch(userActions.activeUser(item));
  }

  return (
    <div className='UserModal'>
      <div className='Overlay' onClick={props.toggleUserModal} />
      <div className='ModalContent'>
        <img
          className='ModalPic'
          src={`${activeUser.profilepicture}`}
          alt='image'
        />
        <span>{activeUser.name}</span>
        <span className='ModalUsername'>{activeUser.username}</span>
        {
          displayUsers.map((item) => {
            return (
              <div className='ModalUserCard' onClick={() => handleUserClick(item)}>
                <img
                  src={`${item.profilepicture}`}
                  className='ProfilePic'
                  alt='image'
                />
                <span>{item.name}</span>
              </div>
            )
          })
        }
        <div className='SignoutButton' onClick={handleLogout}>
          Sign out
        </div>
      </div>
    </div>
  )
}

export default UserModal;