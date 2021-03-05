import logo from './logo.svg';
import PizzaPal from './containers/PizzaPal/PizzaPal';
import 'semantic-ui-css/semantic.min.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
    <PizzaPal />
  </Layout>
  );
}

export default App;