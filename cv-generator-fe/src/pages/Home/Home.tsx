import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CompanyCard from '../../component/CompanyCard/CompanyCard';
import JobCard from '../../component/JobCard/JobCard';
import NavbarControl from '../../component/Navbar/Navbar';
import { ICompanyInfo } from '../../types/company';
import { JobInfo } from '../../types/job';
import './Home.scss';
// import PaginationControl from "../../component/Pagination/Pagination"

const Home = () => {
  const [companies, setCompanies] = useState<ICompanyInfo[]>([]);
  const [totalCompanyPage, setTotalCompanyPage] = useState(1);
  const [totalJobPage, setTotalJobPage] = useState(1);
  const [jobs, setJobs] = useState<JobInfo[]>([]);
  const [activeJobPage, setActiveJobPage] = useState(1);
  const [activeCompanyPage, setActiveCompanyPage] = useState(1);

  // useEffect(() => {
  //     fetchCompany()
  // }, [activeCompanyPage])

  // useEffect(() => {
  //     fetchJobs()
  // }, [activeJobPage])

  // const changeActiveJobPage = (event) => {
  //     setActiveJobPage(parseInt(event.target.innerHTML));
  // }
  // const changeActiveCompanyPage = (event) => {
  //     setActiveCompanyPage(parseInt(event.target.innerHTML));
  // }

  // const fetchCompany = async () => {
  //     const companyFetched = await api({
  //         url: "/employer/getCompanies",
  //         method: "GET",
  //         params: {
  //             page: activeCompanyPage,
  //             limit: 6
  //         }
  //     })

  //     console.log("companies", companyFetched);

  //     if (companyFetched.success) {
  //         setCompanies(companyFetched.data.data)
  //         setTotalCompanyPage(companyFetched.data.total)
  //     }

  // }
  // const fetchJobs = async () => {
  //     const jobFetched = await api({
  //         url: "/job/getJobs",
  //         method: "GET",
  //         params: {
  //             page: activeJobPage,
  //             limit: 6
  //         }
  //     })

  //     console.log("job", jobFetched);

  //     if (jobFetched.success) {
  //         setJobs(jobFetched.data.data)
  //         setTotalJobPage(jobFetched.data.total)
  //     }

  // }

  const renderCompanies = (companies: ICompanyInfo[]) => {
    if (companies.length === 0) {
      return (
        <div className="mt-5 mb-5">
          <h1
            style={{
              paddingBottom: '20px',
              fontWeight: '600',
              fontSize: '30px',
              textAlign: 'center',
            }}
          >
            No company found...
          </h1>
        </div>
      );
    }

    return companies.map((company) => {
      return (
        <Col md="4" xs="12">
          <CompanyCard
            key={company.id}
            src={company.image}
            companyName={company.companyName}
            address={company.address}
          ></CompanyCard>
        </Col>
      );
    });
  };

  const renderJobs = (jobs: JobInfo[]) => {
    if (jobs.length === 0) {
      return (
        <div className="mt-5 mb-5">
          <h1
            style={{
              paddingBottom: '20px',
              fontWeight: '600',
              fontSize: '30px',
              textAlign: 'center',
            }}
          >
            No job found...
          </h1>
        </div>
      );
    }

    return jobs.map((job) => {
      return (
        <Col lg="6" md="12">
          <JobCard
            key={job.id}
            src={job.image}
            title={job.title}
            address={job.address}
            salary={job.salary}
            tags={job.tags}
            status={job.status}
          ></JobCard>
        </Col>
      );
    });
  };

  return (
    <div className="wrap">
      <NavbarControl></NavbarControl>
      <Container>
        <div className="top-job">
          <h1
            style={{ marginLeft: '10px', fontWeight: '700', fontSize: '40px' }}
          >
            {' '}
            Top Job{' '}
          </h1>
          <Row style={{ width: '100%' }}>{renderJobs(jobs)}</Row>
          {/* <PaginationControl 
                        changeActivePage={changeActiveJobPage} 
                        active={activeJobPage}
                        total={totalJobPage} 
                        limit={6}>
                        </PaginationControl> */}
        </div>

        <div className="top-company">
          <h1
            style={{ marginLeft: '10px', fontWeight: '700', fontSize: '40px' }}
          >
            {' '}
            Top Company{' '}
          </h1>
          <Row style={{ width: '100%' }}>{renderCompanies(companies)}</Row>
          {/*                     
                    <PaginationControl
                        changeActivePage={changeActiveCompanyPage}
                        active={activeCompanyPage}
                        total={totalCompanyPage}
                        limit={6}>

                    </PaginationControl> */}
        </div>
      </Container>
    </div>
  );
};

export default Home;
