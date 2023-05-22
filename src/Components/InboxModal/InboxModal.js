import { useState } from 'react';
import './InboxModal.css';
import { FiMessageSquare } from 'react-icons/fi';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import { chatActions } from '../../Store/ChatsReducer';

const InboxModal = (props) => {

  const [extended, setExtended] = useState(false);
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  const chatUsers = JSON.parse(localStorage.getItem('users')).filter((item) => item.id != activeUser.id);
  console.log(activeUser, chatUsers);
  const dispatch = useDispatch();

  const toggleExtended = () => {
    setExtended(!extended);
  }

  const onUserClick = (item) => {
    dispatch(chatActions.loadChatUser(item));
    props.toggleChatModal();
  }

  return (
    <div className='InboxModal'>
      <div className='InboxModalHeader'>
        <div className='InboxHeaderContent'>
          <section className='ChatSection'>
            <FiMessageSquare />
            <span style={{ marginLeft: '5px' }}>Chats</span>
          </section>
          {!extended && <RiArrowUpSLine style={{ cursor: 'pointer' }} onClick={toggleExtended} />}
          {extended && <RiArrowDownSLine style={{ cursor: 'pointer' }} onClick={toggleExtended} />}
        </div>
      </div>
      {extended &&
        <div className='InboxModalChats'>
          <Scrollbars autoHide={true} autoHideTimeout={2000}>
            {chatUsers.map((item, index) => {
              return (
                <div className='ChatCard' onClick={() => onUserClick(item)}>
                  <section className='UserChatDetails'>
                    <img
                      src={`${item.profilepicture}`}
                      className='ProfilePic'
                      alt='image'
                    />
                    <span>{item.name}</span>
                  </section>
                  <div className={`${index % 3 === 0 ? 'InactiveUser' : 'ActiveUser'}`} />
                </div>
              )
            })}
          </Scrollbars>
        </div>
      }
    </div>
  )
}

export default InboxModal;