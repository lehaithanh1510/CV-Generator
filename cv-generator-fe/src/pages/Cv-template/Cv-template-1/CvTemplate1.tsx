import { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLinkedin, FaGithubSquare, FaFacebookSquare } from 'react-icons/fa';
import { fetchEmployeeInfo } from '../../../api/employee';
import {
  IUserInfoForm,
  IWorkingExperienceInfo,
} from '../../../component/EmployeeInfoForm/EmployeeInfoForm';
import * as _ from 'lodash';
import './CvTemplate1.scss';
import { jsPDF } from 'jspdf';

const CvTemplate1 = () => {
  const [userResumeData, setUserResumeData] = useState<IUserInfoForm>(
    {} as IUserInfoForm,
  );
  const [mounted, setMounted] = useState(false);
  const [userWorkingExperience, setUserWorkingExperience] = useState<
    IWorkingExperienceInfo[] | undefined
  >([] as IWorkingExperienceInfo[]);

  const createCv = async () => {
    const doc = new jsPDF('l', 'px', 'a4');
    doc.html(document.getElementById('fileToPrint') as HTMLElement, {
      callback: function (pdf) {
        pdf.save('cvFile.pdf');
      },
    });
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const data = await fetchEmployeeInfo();

        setUserResumeData(
          _.omit(data, [
            'userId',
            'workingExperience',
            'createdAt',
            'updatedAt',
            'resumes',
            'id',
          ]),
        );

        setUserWorkingExperience(data.workingExperience);

        setMounted(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchedData();
  }, []);

  const renderWorkingExperience = () => {
    if (userWorkingExperience && userWorkingExperience.length) {
      return (
        <Row className="w-100" style={{ marginLeft: 0 }}>
          <h1
            className="text-center text-dark w-100 pt-4 font-weight-bold"
            style={{ fontWeight: 700, fontSize: '25px' }}
          >
            Professional Info
          </h1>
          <Col className="py-4 mx-4">
            <ul>
              {userWorkingExperience.map((uWE, id) => {
                return (
                  <li>
                    <h3
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700, fontSize: '25px' }}
                    >
                      {id + 1}.{uWE.position}
                    </h3>
                    <h6
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700, fontSize: '25px' }}
                    >
                      {uWE.companyName}
                    </h6>
                    <p
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700 }}
                    >
                      {uWE.startingDate}/{uWE.endingDate}
                    </p>
                    <p
                      className="text-dark font-weight-normal"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {uWE.responsibility}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      );
    }
  };

  return (
    <Fragment>
      {mounted ? (
        <Container className="mt-4 mb-2" style={{ maxWidth: '50%' }}>
          <main id="fileToPrint" className="resume-section pl-4">
            <header>
              <Row
                className="border-bottom border-dark w-100"
                style={{ marginLeft: 0 }}
              >
                <Col sm={12} md={6} className="py-4 px-4">
                  <h1
                    className="text-dark font-weight-bold"
                    style={{ fontWeight: '700', fontSize: '30px' }}
                  >
                    {userResumeData.name}
                  </h1>
                  <h6 className="h5 text-dark">{userResumeData.profession}</h6>
                  <div className="w-50 d-flex justify-content-between user-social-icons">
                    <a href={userResumeData.linkedInLink} className="text-dark">
                      <FaLinkedin size={28} />
                    </a>
                    <a href={userResumeData.facebookLink} className="text-dark">
                      <FaFacebookSquare size={28} />
                    </a>
                    <a href={userResumeData.gitHubLink} className="text-dark">
                      <FaGithubSquare size={28} />
                    </a>
                  </div>
                </Col>
                <Col sm={12} md={6}>
                  <p className="py-4 text-dark">
                    {userResumeData.profileDescription}
                  </p>
                </Col>
              </Row>
            </header>
            <Row
              className="border-bottom border-dark w-100 px-4 "
              style={{ marginLeft: 0 }}
            >
              <h1
                className="text-center text-dark w-100 pt-4 font-weight-bold"
                style={{ fontWeight: 700, fontSize: '25px' }}
              >
                General Info
              </h1>
              <Col sm={12} md={6} className="my-4">
                <ul>
                  <li className="d-flex align-items justify-content-start">
                    <h6
                      className="font-weight-bold text-dark"
                      style={{ fontWeight: 700 }}
                    >
                      Email:
                    </h6>
                    <p className="px-2">{userResumeData.email}</p>
                  </li>
                  <li className="d-flex align-items justify-content-start">
                    <h6
                      className="font-weight-bold text-dark"
                      style={{ fontWeight: 700 }}
                    >
                      Location:
                    </h6>
                    <p className="px-2">{userResumeData.location}</p>
                  </li>
                </ul>
              </Col>
              <Col sm={12} md={6} className="my-4">
                <ul>
                  <li className="d-flex align-items justify-content-start">
                    <h6
                      className="font-weight-bold text-dark"
                      style={{ fontWeight: 700 }}
                    >
                      Gender:
                    </h6>
                    <p className="px-2">{userResumeData.gender}</p>
                  </li>
                  <li className="d-flex align-items justify-content-start">
                    <h6
                      className="font-weight-bold text-dark"
                      style={{ fontWeight: 700 }}
                    >
                      Phone Number:
                    </h6>
                    <p className="px-2">{userResumeData.mobilePhone}</p>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row
              className="border-bottom border-dark w-100"
              style={{ marginLeft: 0 }}
            >
              <h1
                className="text-center text-dark w-100 pt-4 font-weight-bold"
                style={{ fontWeight: 700, fontSize: '25px' }}
              >
                Educational Info
              </h1>
              <Col className="py-4 mx-4">
                <ul>
                  <li>
                    <h3
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700, fontSize: '25px' }}
                    >
                      High school:
                      {' ' + userResumeData.education?.highSchool?.schoolName}
                    </h3>
                    <h6
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700 }}
                    >
                      {userResumeData.education?.highSchool?.degree}
                    </h6>
                    <p
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700 }}
                    >
                      {userResumeData.education?.highSchool?.startingDate}/
                      {userResumeData.education?.highSchool?.endingDate}
                    </p>
                  </li>
                  <li>
                    <h3
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700, fontSize: '25px' }}
                    >
                      University:
                      {' ' + userResumeData.education?.university?.schoolName}
                    </h3>
                    <h6
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700 }}
                    >
                      {userResumeData.education?.university?.degree}
                    </h6>
                    <p
                      className="text-dark font-weight-bold"
                      style={{ fontWeight: 700 }}
                    >
                      {userResumeData.education?.university?.startingDate}/
                      {userResumeData.education?.university?.endingDate}
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
            {renderWorkingExperience()}
            <Row
              className="px-2 border-top border-dark w-100"
              style={{ marginLeft: 0 }}
            >
              <h1
                className="text-center text-dark w-100 pt-4 font-weight-bold"
                style={{
                  fontWeight: 700,
                  whiteSpace: 'pre-line',
                  fontSize: '25px',
                }}
              >
                Hands On Skills
              </h1>
              <p className="py-3" style={{ whiteSpace: 'pre-line' }}>
                {userResumeData.skills}
              </p>
            </Row>
          </main>
          <Button
            variant="dark"
            className="py-2 my-3 text-white font-weight-bold"
            style={{ width: '100%' }}
            onClick={createCv}
          >
            Save
          </Button>
        </Container>
      ) : (
        'Loading.....'
      )}
    </Fragment>
  );
};

export default CvTemplate1;
