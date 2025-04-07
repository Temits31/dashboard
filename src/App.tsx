
import EmployeeCard from "./EmployeeCard"
import NavBar from './NavBar';


const App = () => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <div className="">
        <EmployeeCard />
      </div>
    </div>
  )
}

export default App