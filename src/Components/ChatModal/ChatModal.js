import { useSelector } from "react-redux";
import './ChatModal.css';
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { MdSend } from "react-icons/md";

const ChatModal = (props) => {

  const chatUser = useSelector(state => state.chats.chatsUser);
  const [extended, setExtended] = useState(true);

  const toggleExtended = () => {
    setExtended(!extended);
  }

  return (
    <div className="ChatModal">
      <div className="ChatModalHeader">
        <section className="ChatHeaderContent">
          <img
            className="ProfilePic"
            style={{ marginRight: '5px', marginLeft: '10px' }}
            src={`${chatUser.profilepicture}`}
            alt="image"
          />
          <span style={{ fontSize: '12px' }}>{chatUser.name}</span>
        </section>
        <section className="ChatHeaderContent" style={{ marginRight: '10px' }}>
          {!extended && <RiArrowUpSLine style={{ cursor: 'pointer', marginRight: '5px' }} onClick={toggleExtended} />}
          {extended && <RiArrowDownSLine style={{ cursor: 'pointer', marginRight: '5px' }} onClick={toggleExtended} />}
          <TiCancel style={{ cursor: 'pointer' }} onClick={() => props.toggleChatModal()} />
        </section>
      </div>
      {extended &&
        <div className="Chats">
          <Scrollbars autoHide={true} autoHideTimeout={2000}>
            <section className="ChatField">
              <span className="SentText">Hello</span>
              <span className="SentText">This is a sample text</span>
              <span>9 : 16 PM</span>
              <span className="ReceivedText">This is a long text to show the chats are dynamic</span>
              <span className="ReceivedText">This is working</span>
            </section>
          </Scrollbars>
          <section className="InputChat">
            <input className="ChatInput" type="text" />
            <MdSend style={{color: '#1560bd', marginRight: '10px', cursor: 'pointer'}}/>
          </section>
        </div>
      }
    </div>
  )
}

export default ChatModal;