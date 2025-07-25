import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/molecules/Navbar';
import Footer from './components/molecules/Footer';
import Home from './app/Home';
import { useAppContext } from './AppContext';
import Products from './app/Products';
import Product from './app/Product';
import Cart from './app/cart/Cart';
import NotFoundPage from './app/NotFound';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import ContactUsPage from './app/ContactUs';

function App() {
  const { menu, loading, menuSetting, loadingSetting } = useAppContext();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  // Enhanced component resolver
  const resolveComponentByUrlType = (urlType, href) => {
    const componentMap = {
      site_type_url: {
        '/': <Home />,
        '/contact-us': <ContactUsPage />,
      },
      category_type_url: <Products category={href} />, // Pass category as prop
      custom_type_url: {
        '/cart': <Cart />,
        // Add other custom_type_url paths here
      },
    };

    // Handle nested mappings
    if (urlType === 'site_type_url' || urlType === 'custom_type_url') {
      const path = href.startsWith('/') ? href : `/${href}`;
      return componentMap[urlType][path] || <NotFoundPage />;
    }

    return componentMap[urlType] || <NotFoundPage />;
  };

  // Generate routes from menu data
  const generateRoutes = items => {
    const routes = [];

    const traverse = list => {
      for (const item of list) {
        if (item?.href && item?.url_type) {
          const path = item.href.startsWith('/') ? item.href : `/${item.href}`;
          routes.push(<Route key={path} path={path} element={resolveComponentByUrlType(item.url_type, item.href)} />);
        }

        if (item.children?.length) {
          traverse(item.children);
        }
      }
    };

    traverse(items);
    return routes;
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-white'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--main)] border-solid'></div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar menu={menu} loading={loading} menuSetting={menuSetting} loadingSetting={loadingSetting} />
      <Routes>
        {/* Home route */}
        <Route path='/' element={<Home />} />

        {/* Generated routes from menu */}
        {generateRoutes(menu?.header?.data)}

        {/* Fixed routes */}
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer menu={menu} loading={loading} menuSetting={menuSetting} loadingSetting={loadingSetting} />
    </Router>
  );
}

export default App;
