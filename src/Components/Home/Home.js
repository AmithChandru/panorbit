import { useSelector } from 'react-redux';
import './Home.css';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import UserModal from '../UserModal/UserModal';

const Home = () => {

  const activeUser = useSelector(state => state.users.activeUser);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userModal, setUserModal] = useState(false);
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
    console.log(activeUser);
    if (activeUser) setLoading(false);
  }, [activeUser])

  const toggleUserModal = () => {
    setUserModal(!userModal);
  }
  
  return (
    <div className='HomePage'>
      {userModal && <UserModal toggleUserModal={toggleUserModal} />}
      <div className='NavBar'>
        <span
          className='NavItem'
          style={{color: `${selected === 1 ? 'white' : '#d6cfc7'}`}}
        >
          Profile
        </span>
        <span 
          className='NavItem' 
          style={{color: `${selected === 2 ? 'white' : '#d6cfc7'}`}}
        >
          Posts
        </span>
        <span 
          className='NavItem' 
          style={{color: `${selected === 3 ? 'white' : '#d6cfc7'}`}}
        >
          Gallery
        </span>
        <span 
          className='NavItem' 
          style={{color: `${selected === 4 ? 'white' : '#d6cfc7'}`}}
        >
          ToDo
        </span>
      </div>
      {loading ?
        <BounceLoader className='Loaderr' loading={loading} color='#1560bd'/>
      :
        <div className='DetailsSection'>
          <section className='Header'>
            <span>Profile</span>
            <section style={{cursor: 'pointer'}} onClick={toggleUserModal}>
              <img className='ProfilePic' src={`${activeUser.profilepicture}`}/>
              <span>{activeUser.name}</span>
            </section>
          </section>
          <div className='Details'>
            <section className='Personal'>
              <img className='DisplayPic' src={`${activeUser.profilepicture}`} />
              <span className='NameText'>{activeUser.name}</span>
              <section>
                <span className='SubText'>Username : </span>
                <span>{activeUser.name}</span>
              </section>
              <section>
                <span className='SubText'>e-mail : </span>
                <span>{activeUser.email}</span>
              </section>
              <section>
                <span className='SubText'>Phone : </span>
                <span>{activeUser.phone}</span>
              </section>
              <section style={{borderBottom: '2px solid #d6cfc7', paddingBottom: '10px'}}>
                <span className='SubText'>Website : </span>
                <span>{activeUser.website}</span>
              </section>
              <span className='SubText'>Company</span>
              <section>
                <span className='SubText'>Name : </span>
                <span>{activeUser.company.name}</span>
              </section>
              <section>
                <span className='SubText'>catchphrase : </span>
                <span>{activeUser.company.catchPhrase}</span>
              </section>
              <section>
                <span className='SubText'>bs : </span>
                <span>{activeUser.company.bs}</span>
              </section>
            </section>
            <section className='Address'>
              <span className='SubText' style={{alignSelf: 'start'}}>Address :</span>
              <section className='AddressDetails'>
                <section>
                  <span className='SubText'>Street : </span>
                  <span>{activeUser.address.street}</span>
                </section>
                <section>
                  <span className='SubText'>Suite : </span>
                  <span>{activeUser.address.suite}</span>
                </section>
                <section>
                  <span className='SubText'>City : </span>
                  <span>{activeUser.address.city}</span>
                </section>
                <section>
                  <span className='SubText'>Zipcode : </span>
                  <span>{activeUser.address.zipcode}</span>
                </section>
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
                    <span className='SubText'>Lng : </span>
                    <span>{activeUser.address.geo.lng}</span>
                  </section>
                </div>
              </section>
            </section>
          </div>
        </div>
      }
    </div>
  )
}

export default Home;