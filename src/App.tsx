
import EmployeeCard from "./EmployeeCard"
import EmpSection from "./EmpSection";
import NavBar from './NavBar';
import Reports from './Reports';


const App = () => {
  return (
    <div>
      <div className="fixed top-0 z-50">
            <NavBar />
          </div>
      <div className="pt-9">
        <EmployeeCard />
        <div>
          <EmpSection/>
        </div>
        <div className="max-w-full mt-10">
          <Reports />
        </div>
        
      </div>
    </div>
  )
}

export default App
