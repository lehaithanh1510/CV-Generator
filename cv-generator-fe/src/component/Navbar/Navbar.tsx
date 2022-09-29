import { Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { setCurrentUser } from '../../redux/user/UserAction';
import { useEffect } from 'react';
import { fetchUserInfo } from '../../api/auth';
import { IUserInfo } from '../../types/user';

const NavbarControl = () => {
  const dispatch = useDispatch();
  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser,
  );

  const logout = () => {
    localStorage.removeItem('accessToken');

    dispatch(
      setCurrentUser({
        user: undefined,
        accessToken: '',
      }),
    );
  };

  const setUserInfo = async () => {
    const user = await fetchUserInfo();

    dispatch(
      setCurrentUser({
        user: {
          email: user.identifier,
          userId: user.userId,
          role: user.role,
        },
        accessToken: localStorage.getItem('accessToken') || '',
      }),
    );
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <Navbar
      className="nav-control"
      bg="dark"
      variant="dark"
      style={{ width: '100%' }}
    >
      <Navbar.Brand className="brand" href="/">
        JobFinder - IT Job
      </Navbar.Brand>
      <Nav className="me-auto" style={{ left: '5%' }}>
        <Nav.Link href="searching"> Searching IT Job </Nav.Link>
        <Nav.Link href="#features"> Searching Company </Nav.Link>
      </Nav>
      <div className="login-or-user">
        {!user && (
          <>
            <Nav.Link href="login">Login</Nav.Link>
          </>
        )}

        {user && (
          <div className="user-and-logout">
            <Nav.Link className="d-flex align-items-center" href="/profile">
              {' '}
              <FaUserCircle></FaUserCircle>{' '}
              <div className="mx-1"> Welcome back </div>{' '}
              {user.name || user.email}{' '}
            </Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </div>
        )}
      </div>
    </Navbar>
  );
};
export default NavbarControl;
