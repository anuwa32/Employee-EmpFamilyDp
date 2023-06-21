import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Employee from './components/Employee';
import EmployeeFamily from './components/EmpFamily';
import EmployeeFamilyId from './components/EmpFamilyID'
import EmployeeFamilyProfile from './components/EmpFamilyProfile'
import EmployeeFamilyUpdate from './components/EmployeeFamilyUpdate'
import EmpID from './components/EmpID';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmpProfile from './components/EmployeeProfile';
import EmployeeDelete from './components/EmployeeDelete';

function App() {
  return (
    <BrowserRouter>
    <div>
     <Routes>
      
     <Route path="/" exact element={<Employee />} />
     <Route path="/sidebar" exact element={<Sidebar />} />
     <Route path="/empfamily" exact element={<EmployeeFamily />} />
     <Route path="/empid" exact element={<EmpID />} />
     <Route path="/empprofile" exact element={<EmpProfile />} />
     <Route path="/empupdate" exact element={<EmployeeUpdate />} />
     <Route path="/empfamid" exact element={<EmployeeFamilyId />} />
     <Route path="/empfamilyprofile" exact element={<EmployeeFamilyProfile />} />
     <Route path="/empdelete" exact element={<EmployeeDelete />} />
     <Route path="/empfamilyupdate" exact element={<EmployeeFamilyUpdate />} />


     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
