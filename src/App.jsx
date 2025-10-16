import { useState } from 'react';
import './index.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Slots from './components/Slots';
import Payment from './components/Payment';
import FinalPayment from './components/FinalPayment';
import Admin from './Admin';
import BookingHistory from './components/BookingHistory';
import EditProfile from './components/EditProfile';

function App() {
  const [page, setPage] = useState('welcome'); // 'welcome', 'login', 'register', 'dashboard', 'book'
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [slotConfig, setSlotConfig] = useState({
    disabledSlots: [],
    paymentMethods: ['upi', 'ewallet', 'cash'],
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData({});
    setPage('welcome');
  };

  const renderPage = () => {
    if (page === 'welcome') return <Welcome onLogin={() => setPage('login')} onRegister={() => setPage('register')} />;
    
    if (page === 'login')
      return (
        <Login
          onSuccess={(user) => {
            setIsAuthenticated(true);
            setUserData(user);
            setPage('dashboard');
          }}
        />
      );

    if (page === 'register') return <Register onSuccess={() => setPage('login')} />;

    if (page === 'dashboard')
      return (
        <Dashboard
          userData={userData}
          onLogout={handleLogout} 
          onNavigate={(targetPage) => {
            if (targetPage === 'book') {
              setStep(1);
            }
            setPage(targetPage);
          }}
        />
      );

    if (page === 'book') {
      return (
        <>
          {step === 1 && (
            <Slots
              userData={userData}
              setUserData={setUserData}
              onNext={() => setStep(2)}
              onBack={() => setPage('dashboard')} // Back button support
              slotConfig={slotConfig}
            />
          )}
          {step === 2 && (
            <Payment
              userData={userData}
              slotConfig={slotConfig}
              onFinish={() => setStep(3)} // Fix: next step is 3, not 4
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <FinalPayment
              userData={userData}
              onFinish={() => {
                setStep(1);
                setPage('dashboard');
              }}
              onBack={() => setStep(2)}
            />
          )}
        </>
      );
    }

    if (page === 'history') {
      return <BookingHistory userData={userData} onBack={() => setPage('dashboard')} />;
    }

    if (page === 'edit-profile') {
      return <EditProfile userData={userData} setUserData={setUserData} onBack={() => setPage('dashboard')} />;
    }

    return <div>Error: Unknown page "{page}"</div>;
  };



  return <>{renderPage()}</>;
}

export default App;
