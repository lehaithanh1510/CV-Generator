import axios from 'axios';
import React, { useState } from 'react';
import { renderErrorMessage } from '../../helper';
import { EIdentifyType, EJobFinderRole } from '../../types';
import { IApiLoginResponse } from '../../types/auth';

import './SignUpForm.scss';

const SignUpForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [role, setRole] = useState<EJobFinderRole>(EJobFinderRole.EMPLOYEES);
  const [currentError, setCurrentError] = useState<string[]>([]);

  const handleCreateAccount = async () => {
    try {
      const { data } = await axios.post<IApiLoginResponse>(
        `${process.env.REACT_APP_API_BASE_URL}auth/register`,
        {
          email: username,
          password,
          passwordAgain,
          role,
          identifierType: EIdentifyType.CREDENTIAL,
        },
      );

      console.log(data);
    } catch (err: any) {
      Array.isArray(err.response.data.message)
        ? setCurrentError([...err.response.data.message])
        : setCurrentError([err.response.data.message]);
    }
  };

  const handleCreateAccountWithGoogle = () => {
    console.log(role);
  };

  const handleCreateAccountWithFacebook = () => {
    console.log(role);
  };

  return (
    <div className="signUp-page">
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
            {!!currentError.length && renderErrorMessage(currentError)}

            <div className="fieldGroup">
              <input
                type="text"
                name="username"
                placeholder="Email"
                maxLength={5000}
                autoComplete="false"
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
            <div className="fieldGroup">
              <input
                type="password"
                name="passwordAgain"
                placeholder="Confirm password"
                maxLength={500}
                autoComplete="false"
                value={passwordAgain}
                onChange={(e) => {
                  setPasswordAgain(e.target.value);
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
                    setRole(EJobFinderRole.EMPLOYEES);
                  }}
                />{' '}
                Employer
              </div>
            </div>
          </form>
          <button
            style={{ backgroundColor: '#38e168', fontSize: '17px' }}
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
          <button
            style={{ backgroundColor: 'red', fontSize: '17px' }}
            onClick={handleCreateAccountWithGoogle}
          >
            Continue with Google
          </button>
          {/* <button
            style={{ backgroundColor: '#359CE3', fontSize: '17px' }}
            onClick={handleCreateAccountWithFacebook}
          >
            Continue with Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
