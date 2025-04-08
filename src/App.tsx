
import EmployeeCard from "./EmployeeCard"
import NavBar from './NavBar';
import Reports from './Reports';


const App = () => {
  return (
    <div>
      <div className="fixed top-0">
            <NavBar />
          </div>
      <div className="">
        <EmployeeCard />
        <div className="max-w-full">
          <Reports />
        </div>
      </div>
    </div>
  )
}

export default App
