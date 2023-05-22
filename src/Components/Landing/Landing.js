import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UsersReducer";
import Scrollbars from "react-custom-scrollbars";
import { BounceLoader } from "react-spinners";
import './Landing.css';
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    await fetch('https://panorbit.in/api/users.json')
      .then((res) => {
        res.json().then((data) => {
          setUsers(data.users);
          setLoading(false);
          dispatch(userActions.loadUsers(data.users));
        })
      })
  }

  const handleClick = (item) => {
    dispatch(userActions.activeUser(item));
    navigate('/home');
  }

  return (
    <div className='ProfileContainer'>
      <span className='SelectTitle'>Select an account</span>
      {loading ?
        <BounceLoader className='Loader' loading={loading} color="#1560bd" />
        :
        <Scrollbars
          autoHideTimeout={2000}
          autoHide={true}
        // className='bounce'
        >
          <div className='UserDetails'>
            {users.map((item) => {
              return (
                <div className='UserCard' onClick={() => handleClick(item)}>
                  <img
                    className='ProfilePic'
                    src={`${item.profilepicture}`}
                    alt='Pic'
                  />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </Scrollbars>
      }
    </div>
  )
}

export default Landing;