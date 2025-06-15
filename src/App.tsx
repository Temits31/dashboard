import Import from "./Import";
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeCard from "./EmployeeCard";
import EmpSection from "./EmpSection";
import Reports from "./Reports";
import Settings from "./Settings";

const App = () => {
  return (
    <Router>
      <div>
        <div className="fixed top-0 z-50">
          <NavBar />
        </div>

        <Routes>
          <Route path='/Import' element={<Import />} />
          <Route path='/EmployeeCard' element={<EmployeeCard />} />
          <Route path='/EmpSection' element={<EmpSection />} />
          <Route path='/Reports' element={<Reports />} />
          <Route path='/Settings' element={<Settings />} />





        </Routes>
      </div>
    </Router>
  );
}

export default App;
