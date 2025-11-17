import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Registration } from './pages/Registration/Registration';
import { About } from './components/About/About';
import { AccountPage } from './pages/AccountPage/AccountPage'
export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/registration" element={<Registration />} />
                <Route path='/about' element={<About/>}/>
                <Route path='/profile' element={<AccountPage/>}/>
             
            </Routes>
        </Router>
    );
}