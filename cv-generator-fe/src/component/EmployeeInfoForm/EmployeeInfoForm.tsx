import {
  Container,
  Form,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fetchEmployeeInfo, updateEmployeeInfo } from '../../api/employee';
import * as _ from 'lodash';
import template1 from '../../img/cvTemplatePreview/template1.png';
import template2 from '../../img/cvTemplatePreview/template2.png';
import { ECvTemplate } from '../../types';
import { useNavigate } from 'react-router-dom';

export interface ISchoolInfo {
  startingDate?: string;
  endingDate?: string;
  degree?: string;
  schoolName?: string;
}

export interface IEducationInfo {
  highSchool?: ISchoolInfo;
  university?: ISchoolInfo;
}

export interface IWorkingExperienceInfo {
  position?: string;
  companyName?: string;
  startingDate?: string;
  endingDate?: string;
  responsibility?: string;
  projectName?: string;
  projectDescription?: string;
}

export interface IUserInfoForm {
  name?: string;
  gender?: string;
  profession?: string;
  location?: string;
  mobilePhone?: string;
  email?: string;
  profileDescription?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
  education?: IEducationInfo;
  skills?: string;
}

const EmployeeInfoForm = () => {
  const [userInfoForm, setUserInfoForm] = useState<IUserInfoForm>(
    {} as IUserInfoForm,
  );
  const [cvTemplate, setCvTemplate] = useState<ECvTemplate>(
    ECvTemplate.TEMPLATE1,
  );
  const navigate = useNavigate();

  const handleChangeInfoForm = (e: any) => {
    setUserInfoForm({
      ...userInfoForm,
      [e.target.name]: e.target.value,
    });
  };

  const [userFirstWorkingExperience, setUserFirstWorkingExperience] = useState<
    IWorkingExperienceInfo | undefined
  >({} as IWorkingExperienceInfo);
  const handleUserFirstWorkingExperience = (e: any) => {
    setUserFirstWorkingExperience({
      ...userFirstWorkingExperience,
      [e.target.name]: e.target.value,
    });
  };

  const [userSecondWorkingExperience, setUserSecondWorkingExperience] =
    useState<IWorkingExperienceInfo | undefined>({} as IWorkingExperienceInfo);
  const handleUserSecondWorkingExperience = (e: any) => {
    setUserSecondWorkingExperience({
      ...userSecondWorkingExperience,
      [e.target.name]: e.target.value,
    });
  };

  const [userThirdWorkingExperience, setUserThirdWorkingExperience] = useState<
    IWorkingExperienceInfo | undefined
  >({} as IWorkingExperienceInfo);
  const handleUserThirdWorkingExperience = (e: any) => {
    setUserThirdWorkingExperience({
      ...userThirdWorkingExperience,
      [e.target.name]: e.target.value,
    });
  };

  // sum up all the information into one object
  const handleUserResumeData = async (e: any) => {
    e.preventDefault();

    await updateEmployeeInfo({
      ...userInfoForm,
      workingExperience: _.remove(
        [
          userFirstWorkingExperience,
          userSecondWorkingExperience,
          userThirdWorkingExperience,
        ],
        (element: IWorkingExperienceInfo | undefined) => {
          return !_.isEmpty(element);
        },
      ) as IWorkingExperienceInfo[],
    });

    navigate(`/${cvTemplate}`);
  };

  const fetchEmployeeDetailInfo = async () => {
    const data = await fetchEmployeeInfo();

    setUserInfoForm(
      _.omit(data, [
        'userId',
        'workingExperience',
        'createdAt',
        'updatedAt',
        'resumes',
        'id',
      ]),
    );

    if (_.get(data, 'workingExperience[0]')) {
      setUserFirstWorkingExperience(_.get(data, 'workingExperience[0]'));
    }
    if (_.get(data, 'workingExperience[1]')) {
      setUserFirstWorkingExperience(_.get(data, 'workingExperience[1]'));
    }
    if (_.get(data, 'workingExperience[2]')) {
      setUserFirstWorkingExperience(_.get(data, 'workingExperience[2]'));
    }
  };

  useEffect(() => {
    fetchEmployeeDetailInfo();
  }, []);

  return (
    <Container className="mt-5 mb-2" style={{ maxWidth: '70%' }}>
      <Form className="form-section">
        <h1
          className="font-weight-bold text-dark py-3"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '40px',
            textAlign: 'center',
          }}
        >
          {' '}
          Personal Information
        </h1>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Full Name</FormLabel>
            <FormControl
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChangeInfoForm}
              value={userInfoForm.name}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Gender</FormLabel>
            <FormControl
              as="select"
              name="gender"
              onChange={handleChangeInfoForm}
              value={userInfoForm.gender}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </FormControl>
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Profession</FormLabel>
            <FormControl
              type="text"
              placeholder="e.g Full stack developer"
              name="profession"
              onChange={handleChangeInfoForm}
              value={userInfoForm.profession}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Mobile Phone </FormLabel>
            <FormControl
              type="text"
              placeholder="+01 23 456 789"
              name="mobilePhone"
              onChange={handleChangeInfoForm}
              value={userInfoForm.mobilePhone}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Email </FormLabel>
            <FormControl
              type="email"
              placeholder="info@domain.com"
              name="email"
              onChange={handleChangeInfoForm}
              value={userInfoForm.email}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Location</FormLabel>
            <FormControl
              type="text"
              placeholder="Lahore, Pakistan"
              name="location"
              onChange={handleChangeInfoForm}
              value={userInfoForm.location}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            className="d-flex flex-column align-items-start mt-3"
          >
            <Form.Label>Describe Yourself</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="profileDescription"
              onChange={handleChangeInfoForm}
              value={userInfoForm.profileDescription}
              required
            />
          </FormGroup>
        </Row>
        <h1
          className="text-dark font-weight-bold py-4"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '40px',
            textAlign: 'center',
          }}
        >
          Social Detail
        </h1>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>GitHub Link</FormLabel>
            <FormControl
              type="text"
              placeholder="e.g johnDoe123"
              name="gitHubLink"
              onChange={handleChangeInfoForm}
              value={userInfoForm.gitHubLink}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>LinkedIn Link</FormLabel>
            <FormControl
              type="text"
              placeholder="e.g johnDoe123"
              name="linkedInLink"
              onChange={handleChangeInfoForm}
              value={userInfoForm.linkedInLink}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Facebook Link</FormLabel>
            <FormControl
              type="text"
              placeholder="e.g johnDoe123"
              name="facebookLink"
              onChange={handleChangeInfoForm}
              value={userInfoForm.facebookLink}
              required
            />
          </FormGroup>
        </Row>
        <h1
          className="text-dark font-weight-bold py-4"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '40px',
            textAlign: 'center',
          }}
        >
          Educational Detail (Add 2 educational details)
        </h1>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> High school Major </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g metric with computer sciences"
              name="education.highSchool.degree"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.highSchool?.degree}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> School Name </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g govt school"
              name="education.highSchool.schoolName"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.highSchool?.schoolName}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Starting Date</FormLabel>
            <FormControl
              type="date"
              name="education.highSchool.startingDate"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.highSchool?.startingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Ending Date</FormLabel>
            <FormControl
              type="date"
              name="education.highSchool.endingDate"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.highSchool?.endingDate}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> University Degree </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g bachelor in computer science"
              name="education.university.degree"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.university?.degree}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> University Name </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g university of the punjab"
              name="education.university.schoolName"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.university?.schoolName}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Starting Date</FormLabel>
            <FormControl
              type="date"
              name="education.university.startingDate"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.university?.startingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Ending Date</FormLabel>
            <FormControl
              type="date"
              name="education.university.endingDate"
              onChange={handleChangeInfoForm}
              value={userInfoForm.education?.university?.endingDate}
              required
            />
          </FormGroup>
        </Row>
        <h1
          className="text-dark font-weight-bold py-4"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '40px',
            textAlign: 'center',
          }}
        >
          Working Experiences{' '}
        </h1>
        <h2
          className="text-dark font-weight-bold py-3"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          First Working Experience
        </h2>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Project Name </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g Shoppe"
              name="projectName"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.projectName}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Position </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g junior web developer"
              name="position"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.position}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Company Name </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g Shopee"
              name="companyName"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.companyName}
              required
            />
          </FormGroup>

          <FormGroup
            as={Col}
            sm={12}
            className="d-flex flex-column align-items-start mt-3"
          >
            <FormLabel>Describe your project</FormLabel>
            <Form.Control
              as="textarea"
              rows={4}
              name="projectDescription"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.projectDescription}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Starting Date</FormLabel>
            <FormControl
              type="date"
              name="startingDate"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.startingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Ending Date</FormLabel>
            <FormControl
              type="date"
              name="endingDate"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.endingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            className="d-flex flex-column align-items-start mt-3"
          >
            <FormLabel>Describe your responsibility</FormLabel>
            <Form.Control
              as="textarea"
              rows={6}
              name="responsibility"
              onChange={handleUserFirstWorkingExperience}
              value={userFirstWorkingExperience?.responsibility}
              required
            />
          </FormGroup>
        </Row>
        <h2
          className="text-dark font-weight-bold py-3"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Second Working Experience
        </h2>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Position </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g junior web developer"
              name="position"
              onChange={handleUserSecondWorkingExperience}
              value={userSecondWorkingExperience?.position}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Company Name </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g Shopee"
              name="companyName"
              onChange={handleUserSecondWorkingExperience}
              value={userSecondWorkingExperience?.companyName}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Starting Date</FormLabel>
            <FormControl
              type="date"
              name="startingDate"
              onChange={handleUserSecondWorkingExperience}
              value={userSecondWorkingExperience?.startingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Ending Date</FormLabel>
            <FormControl
              type="date"
              name="endingDate"
              onChange={handleUserSecondWorkingExperience}
              value={userSecondWorkingExperience?.endingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            className="d-flex flex-column align-items-start mt-3"
          >
            <FormLabel>Describe your responsibility</FormLabel>
            <Form.Control
              as="textarea"
              rows={6}
              name="responsibility"
              onChange={handleUserSecondWorkingExperience}
              value={userSecondWorkingExperience?.responsibility}
              required
            />
          </FormGroup>
        </Row>
        <h2
          className="text-dark font-weight-bold py-3"
          style={{
            paddingBottom: '20px',
            fontWeight: '700',
            fontSize: '30px',
            textAlign: 'center',
          }}
        >
          Third Working Experience
        </h2>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Position </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g junior web developer"
              name="position"
              onChange={handleUserThirdWorkingExperience}
              value={userThirdWorkingExperience?.position}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={6}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel> Company Name </FormLabel>
            <FormControl
              type="text"
              placeholder="e.g Shopee"
              name="companyName"
              onChange={handleUserThirdWorkingExperience}
              value={userThirdWorkingExperience?.companyName}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Starting Date</FormLabel>
            <FormControl
              type="date"
              name="startingDate"
              onChange={handleUserThirdWorkingExperience}
              value={userThirdWorkingExperience?.startingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            md={4}
            className="d-flex flex-column align-items-start"
          >
            <FormLabel>Ending Date</FormLabel>
            <FormControl
              type="date"
              name="endingDate"
              onChange={handleUserThirdWorkingExperience}
              value={userThirdWorkingExperience?.endingDate}
              required
            />
          </FormGroup>
          <FormGroup
            as={Col}
            sm={12}
            className="d-flex flex-column align-items-start mt-3"
          >
            <FormLabel>Describe your responsibility</FormLabel>
            <Form.Control
              as="textarea"
              rows={6}
              name="responsibility"
              onChange={handleUserThirdWorkingExperience}
              value={userThirdWorkingExperience?.responsibility}
              required
            />
          </FormGroup>
        </Row>
        <Row className="mb-3">
          <FormGroup
            as={Col}
            sm={12}
            className="d-flex flex-column align-items-start mt-3"
          >
            <Form.Label>Write Your Skills</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="e.g HTML|CSS|REACTJS|NODEJS|EXPRESSJS"
              name="skills"
              onChange={handleChangeInfoForm}
              value={userInfoForm.skills}
              required
            />
          </FormGroup>
        </Row>
        <Row className="px-2 w-100">
          <h1
            className="text-center text-dark w-100 pt-4 font-weight-bold"
            style={{
              fontWeight: 700,
              whiteSpace: 'pre-line',
              fontSize: '25px',
            }}
          >
            Resume Template
          </h1>
          <div id="checkboxes" className="d-flex justify-content-around">
            <div className="m-3">
              <Form.Check className="d-flex flex-column  align-items-center">
                <div className="d-flex align-items-center my-3">
                  <Form.Check.Input
                    type={'radio'}
                    name="CVChoose"
                    checked
                    onChange={() => {
                      setCvTemplate(ECvTemplate.TEMPLATE1);
                    }}
                  />
                  <Form.Check.Label
                    className="mx-2"
                    style={{ fontSize: '20px' }}
                  >
                    Template 1
                  </Form.Check.Label>
                </div>
                <img
                  alt="CV Template 1"
                  src={template1}
                  style={{ height: '300px', width: '300px' }}
                ></img>
              </Form.Check>
            </div>
            <div className="m-3">
              <Form.Check className="d-flex flex-column  align-items-center">
                <div className="d-flex align-items-center my-3">
                  <Form.Check.Input
                    type={'radio'}
                    name="CVChoose"
                    onChange={() => {
                      setCvTemplate(ECvTemplate.TEMPLATE2);
                    }}
                  />
                  <Form.Check.Label
                    className="mx-2"
                    style={{ fontSize: '20px' }}
                  >
                    Template 2
                  </Form.Check.Label>
                </div>
                <img
                  alt="CV Template 2"
                  src={template2}
                  style={{ height: '300px', width: '300px' }}
                ></img>
              </Form.Check>
            </div>
          </div>
        </Row>
        <Button
          variant="dark"
          type="button"
          className="py-3 my-3"
          onClick={handleUserResumeData}
          style={{ width: '100%' }}
        >
          Generate CV
        </Button>
      </Form>
    </Container>
  );
};

export default EmployeeInfoForm;
