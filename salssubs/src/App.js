import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Layout from './components/Layout/Layout';
import SalsSubs from './containers/salssubs/salssubs';

function App() {
  return (
    <Layout>
      <SalsSubs />
    </Layout>  
  );
}

export default App;
