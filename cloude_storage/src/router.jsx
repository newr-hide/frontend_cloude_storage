import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Registration } from './pages/Registration/Registration';
import { About } from './components/About/About';
import { AccountPage } from './pages/AccountPage/AccountPage'
import { AdminAccountPage } from './pages/AdminAccountPage/AdminAccountPage';
import { AdminUsersPage } from './pages/AdminUsersPage/AdminUsersPage';
import { UserFilePage } from './pages/UserFilePage/UserFilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/registration" element={<Registration />} />
                <Route path='/about' element={<About/>}/>
                <Route path='/profile/:userId' element={<ProtectedRoute><AccountPage/></ProtectedRoute>}/>
                <Route path='/admin/:adminId' element={<ProtectedRoute><AdminAccountPage/></ProtectedRoute>}/>
                <Route path='/admin/:adminId/users' element= {<ProtectedRoute><AdminUsersPage/></ProtectedRoute>}/>
                <Route path='/admin/:adminId/:userId/files' element={<ProtectedRoute><UserFilePage/></ProtectedRoute>} />
             
            </Routes>
        </Router>
    );
}