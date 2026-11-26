import React from 'react';
import { ConfigProvider } from 'antd';
import './App.scss';
import Client from './Pages/Client';
import HousePreloader from './Components/Preloader/HousePreloader';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          colorPrimary: '#f35525',
          borderRadius: 10,
        },
      }}
    >
      <HousePreloader />
      <Client />
    </ConfigProvider>
  );
};

export default App;