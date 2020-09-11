import React, { Suspense } from 'react';
import './assets/styles/app.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routers';
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        {/* {token && <Header />} */}
        <Routes />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
