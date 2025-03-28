import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/auth';
import { Create_Recipes } from './pages/createRecipes';
import { Saved_Recipes } from './pages/savedRecipes';
import { Navbar } from './components/Navbar';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <Router>
      <CookiesProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/saved_recipes' element={<Saved_Recipes/>} />
        <Route path='/create_recipes' element={<Create_Recipes/>} />
        <Route path='/auth' element={<Auth/>} />
      </Routes>
      </CookiesProvider>
    </Router>
  );
}

export default App;
