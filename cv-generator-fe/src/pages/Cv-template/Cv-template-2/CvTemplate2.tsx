import { Box, Heading, HStack, Text, VStack, Wrap } from '@chakra-ui/react';
import { MdMail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { FaLinkedin, FaGithubSquare, FaFacebookSquare } from 'react-icons/fa';
import {
  IUserInfoForm,
  IWorkingExperienceInfo,
} from '../../../component/EmployeeInfoForm/EmployeeInfoForm';
import { fetchEmployeeInfo } from '../../../api/employee';
import * as _ from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';

const CvTemplate2 = () => {
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

  return (
    <Fragment>
      {mounted ? (
        <Container className="mt-4 mb-2" style={{ maxWidth: '50%' }}>
          <Box
            bg={'white'}
            w={'full'}
            rounded={'md'}
            shadow={'md'}
            overflow={'hidden'}
            minH={'100vh'}
            id="fileToPrint"
          >
            <div>
              <HStack justifyContent={'space-between'}>
                <VStack
                  m={4}
                  alignItems={'flex-start'}
                  spacing={0.5}
                  width="40%"
                >
                  <Heading size="xl">
                    {userResumeData.name ? userResumeData.name : 'Jhon Doe'}
                  </Heading>
                  {userResumeData.profession && (
                    <Text color={'gray.500'}>{userResumeData.profession}</Text>
                  )}
                </VStack>
                <VStack
                  p={4}
                  alignItems={'flex-start'}
                  spacing={0.5}
                  width="40%"
                >
                  {userResumeData.profileDescription && (
                    <Text color={'gray.500'}>
                      {userResumeData.profileDescription}
                    </Text>
                  )}
                </VStack>
              </HStack>

              <VStack
                bg={'cyan.400'}
                color={'white'}
                py={4}
                px={10}
                justifyContent={'space-between'}
                alignItems={'inherit'}
                borderTop="solid black"
              >
                <HStack justifyContent={'space-between'}>
                  <HStack spacing={1}>
                    <MdMail />{' '}
                    <Text>
                      {userResumeData.email
                        ? userResumeData.email
                        : 'jhondoe@gmail.com'}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <MdLocalPhone />{' '}
                    <Text>
                      {userResumeData.mobilePhone
                        ? userResumeData.mobilePhone
                        : '+918559584846'}
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <MdLocationPin />{' '}
                    <Text>
                      {userResumeData.location
                        ? userResumeData.location
                        : 'Pune, MH'}
                    </Text>
                  </HStack>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <HStack spacing={1}>
                    <FaLinkedin />{' '}
                    <Text as="a" href={userResumeData.linkedInLink}>
                      LinkedIn
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <FaGithubSquare />{' '}
                    <Text as="a" href={userResumeData.linkedInLink}>
                      GitHub
                    </Text>
                  </HStack>
                  <HStack spacing={1}>
                    <FaFacebookSquare />{' '}
                    <Text as="a" href={userResumeData.linkedInLink}>
                      Facebook
                    </Text>
                  </HStack>
                </HStack>
              </VStack>

              <HStack
                w={'full'}
                h={'full'}
                mb={2}
                px={2}
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                spacing={1}
                borderTop="solid black"
              >
                <VStack mx={5} alignItems={'flex-start'} w={'full'} spacing={6}>
                  <VStack my={5} alignItems={'flex-start'}>
                    <Heading as="h4" size="md" color={'gray.700'}>
                      EDUCATION
                    </Heading>

                    <VStack
                      spacing={0}
                      alignItems={'flex-start'}
                      w={'full'}
                      pb={2}
                    >
                      <Text fontWeight={'medium'}>
                        High school:{' '}
                        {userResumeData.education?.highSchool?.schoolName}
                      </Text>
                      <Text>
                        {userResumeData.education?.highSchool?.degree}
                      </Text>
                      <HStack
                        fontSize={'sm'}
                        fontStyle={'italic'}
                        justifyContent={'space-between'}
                        w={'full'}
                      >
                        <Text>
                          {userResumeData.education?.highSchool?.startingDate}-{' '}
                          {userResumeData.education?.highSchool?.endingDate}
                        </Text>
                      </HStack>
                    </VStack>

                    <VStack
                      spacing={0}
                      alignItems={'flex-start'}
                      w={'full'}
                      pb={2}
                    >
                      <Text fontWeight={'medium'}>
                        University:{' '}
                        {userResumeData.education?.university?.schoolName}
                      </Text>
                      <Text>
                        {userResumeData.education?.university?.degree}
                      </Text>
                      <HStack
                        fontSize={'sm'}
                        fontStyle={'italic'}
                        justifyContent={'space-between'}
                        w={'full'}
                      >
                        <Text>
                          {userResumeData.education?.university?.startingDate} -{' '}
                          {userResumeData.education?.university?.endingDate}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>{' '}
                </VStack>

                <VStack mx={2} alignItems={'flex-start'} w={'full'} spacing={6}>
                  <VStack my={5} alignItems={'flex-start'}>
                    <Heading as="h4" size="md" color={'gray.700'}>
                      SKILLS
                    </Heading>
                    <Wrap>
                      <p style={{ whiteSpace: 'pre-line' }}>
                        {userResumeData.skills}
                      </p>
                    </Wrap>
                  </VStack>
                  {/* <VStack alignItems={'flex-start'}>
                <Heading as="h4" size="md" color={'gray.700'}>
                  PROJECTS
                </Heading>

                {projects.map((project) => {
                  const { name, url, description: desc } = project;
                  return (
                    <VStack
                      spacing={0.5}
                      alignItems={'flex-start'}
                      lineHeight={1.3}
                      pb={2}
                    >
                      <HStack as="a" href={url} target="_blank" spacing={0.5}>
                        <Text fontWeight={'medium'} flex={'row'}>
                          {name ? name : 'Project Name'}{' '}
                        </Text>{' '}
                        <BiLinkExternal />
                      </HStack>
                      <UnorderedList pl={5}>
                        <ListItem>
                          <Text  as="p">
                            {desc
                              ? desc
                              : 'Lorem ipsum dolor sit amet consectetur adipisicing.'}
                          </Text>
                        </ListItem>
                      </UnorderedList>
                    </VStack>
                  );
                })}
              </VStack>*/}
                </VStack>
              </HStack>
              <VStack
                w={'full'}
                h={'full'}
                my={2}
                mb={6}
                px={5}
                py={5}
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                spacing={1}
                borderTop="solid black"
              >
                <Heading as="h4" size="md" color={'gray.700'}>
                  WORK EXPERIENCE
                </Heading>

                {userWorkingExperience &&
                  userWorkingExperience.length &&
                  userWorkingExperience.map((work) => {
                    const {
                      position,
                      projectName,
                      responsibility,
                      companyName,
                      startingDate,
                      endingDate,
                      projectDescription,
                    } = work;

                    return (
                      <VStack
                        spacing={0.5}
                        alignItems={'flex-start'}
                        lineHeight={1.3}
                        pb={2}
                      >
                        <Text fontWeight={'medium'}>{position}</Text>
                        <Text>{companyName}</Text>
                        <Text fontSize={'sm'} fontStyle={'italic'}>
                          {startingDate} - {endingDate}
                        </Text>
                        <div className="d-flex">
                          <Text fontWeight={'medium'} as="p">
                            Project Name:
                          </Text>
                          <Text className="mx-1" as="div">
                            {projectName}
                          </Text>
                        </div>
                        <Text className="mt-1" fontWeight={'medium'} as="p">
                          Project Description:
                        </Text>
                        <Text as="p">{projectDescription}</Text>
                        <Text className="mt-1" fontWeight={'medium'} as="p">
                          Responsibility:
                        </Text>
                        <Text as="p" style={{ whiteSpace: 'pre-line' }}>
                          {responsibility}
                        </Text>
                      </VStack>
                    );
                  })}
              </VStack>
            </div>
          </Box>
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

export default CvTemplate2;
