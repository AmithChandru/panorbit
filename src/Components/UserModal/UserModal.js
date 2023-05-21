import { useSelector } from 'react-redux';
import './UserModal.css';

const UserModal = (props) => {

  const activeUser = useSelector(state => state.users.activeUser);
  const users = useSelector(state => state.users.users);
  const displayUsers = users.filter((item) => activeUser.id !== item.id).slice(0, 2);

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
              <div className='ModalUserCard'>
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
      </div>
    </div>
  )
}

export default UserModal;