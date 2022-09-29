import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase';
import { setCurrentUser } from '../../redux/user/UserAction';
import { EIdentifyType, EJobFinderRole } from '../../types';
import { IApiLoginResponse } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<EJobFinderRole>(EJobFinderRole.EMPLOYEES);

  const handleLoginWithCredential = async (event: any) => {
    event?.preventDefault();

    try {
      const { data } = await axios.post<IApiLoginResponse>(
        `${process.env.REACT_APP_API_BASE_URL}auth/login`,
        {
          email: username,
          password,
          role,
          identifierType: EIdentifyType.CREDENTIAL,
        },
      );

      localStorage.setItem('accessToken', data.accessToken);

      dispatch(
        setCurrentUser({
          user: {
            userId: data.userId,
            email: data.identifier,
            role,
          },
          accessToken: data.accessToken,
        }),
      );

      navigate(`/`);
    } catch (err) {
      console.log('err here', err);
    }
  };

  const handleLoginWithGoogle = async (event: any) => {
    try {
      const { user } = await signInWithGoogle();

      const accessToken = await user.getIdToken();
      const { data } = await axios.post<IApiLoginResponse>(
        `${process.env.REACT_APP_API_BASE_URL}auth/login`,
        {
          email: user.email,
          name: user.displayName,
          accessToken,
          role,
          identifierType: EIdentifyType.GOOGLE,
        },
      );

      localStorage.setItem('accessToken', accessToken);

      dispatch(
        setCurrentUser({
          user: {
            userId: data.userId,
            email: data.identifier,
            name: user.displayName || '',
            role,
          },
          accessToken,
        }),
      );

      navigate(`/`);
    } catch (err) {
      console.log('err here', err);
    }
  };

  return (
    <div className="login-page">
      <h1
        style={{
          paddingBottom: '20px',
          fontWeight: '700',
          fontSize: '50px',
          textAlign: 'center',
        }}
      >
        JobFinder
      </h1>
      <div className="form-content">
        <div className="content-main">
          <form>
            <div className="fieldGroup">
              <input
                type="text"
                name="username"
                placeholder="Email"
                maxLength={5000}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="fieldGroup">
              <input
                type="password"
                name="password"
                placeholder="Password"
                maxLength={500}
                autoComplete="false"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="role-option-container">
              <div className="role-option">
                <input
                  type="radio"
                  value="Employee"
                  name="gender"
                  checked
                  onChange={() => {
                    setRole(EJobFinderRole.EMPLOYEES);
                  }}
                />{' '}
                Employee
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  value="Employer"
                  name="gender"
                  onChange={() => {
                    setRole(EJobFinderRole.EMPLOYERS);
                  }}
                />{' '}
                Employer
              </div>
            </div>
            <button
              style={{ color: 'white', fontSize: '17px' }}
              onClick={handleLoginWithCredential}
            >
              Login
            </button>
          </form>
          <div className="content-middle">
            <p className="forgot-password">
              <Link style={{ textDecoration: 'none' }} to="/forgotPassword">
                Forgot password?
              </Link>
            </p>
          </div>
          <Link to="/signUp">
            <button style={{ backgroundColor: 'gray', fontSize: '17px' }}>
              Create Account
            </button>
          </Link>
          <button
            style={{ backgroundColor: 'red', fontSize: '17px' }}
            onClick={handleLoginWithGoogle}
          >
            Continue with Google
          </button>
          {/* <button
            style={{ backgroundColor: '#359CE3', fontSize: '17px' }}
            onClick={handleLoginWithCredential}
          >
            Continue with Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
