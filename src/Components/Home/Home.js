import { useSelector } from 'react-redux';
import './Home.css';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import UserModal from '../UserModal/UserModal';
import InboxModal from '../InboxModal/InboxModal';
import ChatModal from '../ChatModal/ChatModal';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const Home = () => {

  const activeUser = useSelector(state => state.users.activeUser);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userModal, setUserModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const navBars = ['Profile', 'Posts', 'Gallery', 'ToDo'];
  const navigate = useNavigate();
  /* const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.AIzaSyBl8xbmveoDy7pVm26M7MVS4N4Kb7V_wZ0,
  });
  const center = useMemo(() => ({ lat: activeUser.address.geo.lat, lng: activeUser.address.geo.lng }), []); */

  useEffect(() => {
    if (!activeUser) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    if (activeUser) setLoading(false);
  }, [activeUser])

  const handleNavClick = (item) => {
    setSelected(item);
  }

  const toggleUserModal = () => {
    setUserModal(!userModal);
  }

  const toggleChatModal = () => {
    setChatModal(!chatModal);
  }

  return (
    <div className='HomePage'>
      {userModal && <UserModal toggleUserModal={toggleUserModal} />}
      <InboxModal toggleChatModal={toggleChatModal} />
      {chatModal && <ChatModal toggleChatModal={toggleChatModal} />}
      <div className='NavBar'>
        <section className='NavItem'>
          <span
            style={{ color: `${selected === 1 ? 'white' : '#d6cfc7'}` }}
            onClick={() => handleNavClick(1)}
          >
            Profile
          </span>
          {selected === 1 && <BsFillArrowRightCircleFill color='white' />}
        </section>
        <section className='NavItem'>
          <span
            style={{ color: `${selected === 2 ? 'white' : '#d6cfc7'}` }}
            onClick={() => handleNavClick(2)}
          >
            Posts
          </span>
          {selected === 2 && <BsFillArrowRightCircleFill color='white' />}
        </section>
        <section className='NavItem'>
          <span
            style={{ color: `${selected === 3 ? 'white' : '#d6cfc7'}` }}
            onClick={() => handleNavClick(3)}
          >
            Gallery
          </span>
          {selected === 3 && <BsFillArrowRightCircleFill color='white' />}
        </section>
        <section className='NavItem'>
          <span
            style={{ color: `${selected === 4 ? 'white' : '#d6cfc7'}` }}
            onClick={() => handleNavClick(4)}
          >
            ToDo
          </span>
          {selected === 4 && <BsFillArrowRightCircleFill color='white' />}
        </section>
      </div>
      <div className='DetailsSection'>
        <section className='Header'>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{navBars[selected - 1]}</span>
          <section className='ProfileHeader' onClick={toggleUserModal}>
            <img className='ProfilePic' src={`${activeUser.profilepicture}`} />
            <span>{activeUser.name}</span>
          </section>
        </section>
        {loading ?
          <BounceLoader className='Loaderr' loading={loading} color='#1560bd' />
          :
          selected === 1 ?
            <div className='Details'>
              <section className='Personal'>
                <img className='DisplayPic' src={`${activeUser.profilepicture}`} />
                <span className='NameText'>{activeUser.name}</span>
                <table style={{ borderSpacing: '10px' }}>
                  <tr>
                    <th align='right'><span className='SubText'>Username</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.name}</span></th>
                  </tr>
                  <tr>
                    <th align='right'><span className='SubText'>e-mail</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.email}</span></th>
                  </tr>
                  <tr>
                    <th align='right'><span className='SubText'>Phone</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.phone}</span></th>
                  </tr>
                  <tr>
                    <th align='right'><span className='SubText'>Website</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.website}</span></th>
                  </tr>
                </table>
                <span className='CompanyHeading'>Company</span>
                <table style={{ borderSpacing: '10px' }}>
                  <tr>
                    <th align='right'><span className='SubText'>Name</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.company.name}</span></th>
                  </tr>
                  <tr>
                    <th align='right'><span className='SubText'>catchphrase</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.company.catchPhrase}</span></th>
                  </tr>
                  <tr>
                    <th align='right'><span className='SubText'>bs</span></th>
                    <th> : </th>
                    <th align='left'><span>{activeUser.company.bs}</span></th>
                  </tr>
                </table>
              </section>
              <section className='Address'>
                <span className='SubText' style={{ alignSelf: 'start', fontWeight: 'bold' }}>Address :</span>
                <section className='AddressDetails'>
                  <table style={{ borderSpacing: '10px', alignSelf: 'start' }}>
                    <tr>
                      <th align='right'><span className='SubText'>Street</span></th>
                      <th> : </th>
                      <th align='left'><span>{activeUser.address.street}</span></th>
                    </tr>
                    <tr>
                      <th align='right'><span className='SubText'>Suite</span></th>
                      <th> : </th>
                      <th align='left'><span>{activeUser.address.suite}</span></th>
                    </tr>
                    <tr>
                      <th align='right'><span className='SubText'>City</span></th>
                      <th> : </th>
                      <th align='left'><span>{activeUser.address.city}</span></th>
                    </tr>
                    <tr>
                      <th align='right'><span className='SubText'>Zipcode</span></th>
                      <th> : </th>
                      <th align='left'><span>{activeUser.address.zipcode}</span></th>
                    </tr>
                  </table>
                  {/* <GoogleMap
                    mapContainerClassName='Map-Container'
                    center={center}
                    zoom={10}
                  /> */}
                  <img
                    className='MapPic'
                    src='/map.jpg'
                    alt='image'
                  />
                  <div className='Co-ordinates'>
                    <section>
                      <span className='SubText'>Lat : </span>
                      <span>{activeUser.address.geo.lat}</span>
                    </section>
                    <section>
                      <span className='SubText'>Long : </span>
                      <span>{activeUser.address.geo.lng}</span>
                    </section>
                  </div>
                </section>
              </section>
            </div>
            :
            <span className='ComingSoon'>
              Coming Soon
            </span>
        }
      </div>
    </div>
  )
}

export default Home;