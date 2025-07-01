import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HalamanMenu from './pages/HalamanMenu';
import HalamanAdmin from './pages/HalamanAdmin';
import HalamanLogin from './pages/HalamanLogin';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<HalamanLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<HalamanAdmin />} />
        </Route>
        <Route path="/*" element={<HalamanMenu />} />
      </Routes>
    </Router>
  );
}
export default App;












// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HalamanMenu from './pages/HalamanMenu';
// import HalamanAdmin from './pages/HalamanAdmin';
// import HalamanLogin from './pages/HalamanLogin';
// import ProtectedRoute from './auth/ProtectedRoute';
// import HalamanSukses from './pages/HalamanSukses';

// // Komponen layout ini akan menampilkan halaman pelanggan
// const UserLayout = () => {
//     // Karena HalamanMenu sudah memiliki Navbar dan Footer, kita cukup merendernya
//     return <HalamanMenu />;
// };

// // Komponen layout ini akan menampilkan halaman admin
// const AdminLayout = () => {
//     // Karena HalamanAdmin sudah memiliki Header dan layoutnya sendiri, kita cukup merendernya
//     return <HalamanAdmin />;
// };


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Rute untuk Login */}
//         <Route path="/login" element={<HalamanLogin />} />

//         {/* Rute Terlindungi untuk Admin */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/admin" element={<AdminLayout />} />
//         </Route>
        
//         {/* Rute untuk Pengguna Umum (Halaman Utama) */}
//         <Route path="/*" element={<UserLayout />} />

//         <Route path="/sukses" element={<HalamanSukses />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
