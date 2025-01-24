import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <div className="bg-very-dark-grey min-h-screen grid grid-cols-1 justify-items-center content-center bg-wave bg-no-repeat bg-cover">
        <PasswordGenerator />
    </div>
  );
}

export default App;
