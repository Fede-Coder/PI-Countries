import { Route, Routes } from 'react-router-dom'

//Components
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'

//Views
import NotFound from './views/NotFound/NotFound'
import Landing from './views/Landing/Landing'
import Home from './views/Home/Cards'
import Detail from './views/Detail/Detail'
import Activity from './views/Activity/Activity'


function App() {
    return (
        <>
            <Header />
            <Nav />
            <Routes>
                <Route path='*' element={<NotFound/>} />
                <Route path='/' element={<Landing/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/detail/:detailId' element={<Detail/>} />
                <Route path='/activity' element={<Activity/>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
