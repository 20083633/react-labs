import logo from './logo.svg';
import './App.css';
import Subject from './components/subject';

function App() {
  return (
    <div className="container">
      <h1>Hi, I'm a React App</h1>
      <Subject title="Web App Development 2" year="Year 3">
        Read more about Web App Development 2
      </Subject>
      <Subject title="NoSQL Databases" year="Year 3" />
  	  <Subject title="Digital Graphic Design" year="Year 3" />
    </div>
  );
}

export default App;