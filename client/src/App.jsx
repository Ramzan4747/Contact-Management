

import './App.scss'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Routes  from './pages/Routes'
import Header from './components/Header/Header'
import './config/global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
    <Header />
     <Routes />
     <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

    </>
  )
}

export default App
