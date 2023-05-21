import { useState } from 'react';
import './InboxModal.css';
import { FiMessageSquare } from 'react-icons/fi';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import { chatActions } from '../../Store/ChatsReducer';

const InboxModal = (props) => {

  const [extended, setExtended] = useState(false);
  const users = useSelector(state => state.users.users);
  const activeUser = useSelector(state => state.users.activeUser);
  const chatUsers = users.filter((item) => item !== activeUser);
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
        {/* <div className='Overlay' /> */}
        <div className='InboxHeaderContent'>
          <section className='ChatSection'>
            <FiMessageSquare />
            <span style={{marginLeft: '5px'}}>Chats</span>
          </section>
          {!extended && <RiArrowUpSLine style={{cursor: 'pointer'}} onClick={toggleExtended}/>}
          {extended && <RiArrowDownSLine style={{cursor: 'pointer'}} onClick={toggleExtended}/>}
        </div>
      </div>
      {extended &&
        <div className='InboxModalChats'>
          <Scrollbars autoHide={true} autoHideTimeout={2000}>
            {chatUsers.map((item) => {
              return (
                <div className='ChatCard' onClick={() => onUserClick(item)}>
                  <img 
                    src={`${item.profilepicture}`}
                    className='ProfilePic'
                    alt='image'
                  />
                  <span>{item.name}</span>
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