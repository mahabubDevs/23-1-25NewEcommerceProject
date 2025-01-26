import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AdminDashborde from '../pages/Admin/AdminDashborde';
import SellerDashbord from '../pages/seller/SellerDashbord';
import PublicUserDashbord from '../pages/customer/PublicUserDashbord';
import Checkout from '../Checkout';
import PrivateRoute from './PrivateRoute';

const AppRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Protuct Route Here */}
                <Route path="/admin/dashbord/:id" element={
                    <PrivateRoute>
                        <AdminDashborde />
                    </PrivateRoute> } />
                <Route path="/seller/dashbord/:id" element={
                    <PrivateRoute> 
                        <SellerDashbord />
                    </PrivateRoute> 
                } />
                <Route path="/user/dashbord/:id" element={
                    <PrivateRoute>
                    <PublicUserDashbord />
                </PrivateRoute>} />
                {/* Checkout route  */}
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
                
            
        </Router>
    )
};

export default AppRoute;
