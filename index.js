import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";
import { useState } from "react";

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const getAllStudentSchoolData = async (requests) => {
    try {
      const schoolData = await Promise.all(requests);
      setSchoolsData((prev) => [...prev, ...schoolData]);
    } catch (err) {}
  };

  const getStudentSchool = async (schoolId) => {
    try {
      const schoolData = await fetchSchoolData(schoolId);
      return schoolData;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getAllStudentLegalGuardian = async (requests) => {
    try {
      const guardianData = await Promise.all(requests);
      setLegalguardiansData((prev) => [...prev, ...guardianData]);
    } catch (err) {}
  };

  const getStudentLegalGuardian = async (legalguardianId) => {
    try {
      const legalguardianData = await fetchLegalguardianData(legalguardianId);
      return legalguardianData;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getAllStudentDetails = async (requests) => {
    try {
      const students = await Promise.all(requests);
      setStudentsData((prev) => [...prev, ...students]);
    } catch (err) {}
  };

  const getStudentDetails = async (studentId) => {
    try {
      const studentData = await fetchStudentData(studentId);
      const student = studentData.map((i) => i.student);
      getAllStudentLegalGuardian(
        student.map((i) => getStudentLegalGuardian(i.legalguardianId))
      );
      getAllStudentSchoolData(student.map((i) => getStudentSchool(i.schoolId)));
      return studentData;
    } catch (err) {
      throw new Error(err);
    }
  };

  const onStudentsPick = async (studentIds) => {
    const studentId = studentIds.map((i) => i.studentId);
    getAllStudentDetails(studentId.map((i) => getStudentDetails(i)));
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;

