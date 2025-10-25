import Header from './components/Header';
import { Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import Footer from './components/Footer';
import { githubLink } from './components/Footer/footer-data';
import logo from 'assets/Github-desktop-logo-symbol.svg.png';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer link={githubLink} image={logo} />
    </>
  );
};

export default App;
