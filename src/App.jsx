import React, { useState } from 'react';
import './App.css';
import Component from './component/Component.jsx';
import ComponentConfig from './component/ComponentConfig.jsx';
import { TokenProvider } from './component/context/TokenContext';

function App() {
  const [selectedItems, setSelectedItems] = useState({
    call: true,
    message: false,
    email: true,
  });
  
  const handleSelect = (name, isSelected) => {
    setSelectedItems(prev => ({
      ...prev,
      [name]: isSelected
    }));
  };

  return (
    <TokenProvider>
      <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '20px' }}>
        <Component 
          title="Телефонный звонок" 
          subtitle="Предпочитаемый метод связи" 
          name="call" 
          selected={selectedItems.call} 
          onSelect={handleSelect}
          imageSrc="https://img.dmclk.ru/s200x200q80/vitrina/96/33/9633066a859524b9187b26a37d8833bd6616f24d.jpg"
        />
        <Component 
          title="Текстовое сообщение" 
          subtitle="Быстрый способ связи" 
          name="message" 
          selected={selectedItems.message} 
          onSelect={handleSelect}
          imageSrc="https://img.dmclk.ru/s200x200q80/vitrina/96/33/9633066a859524b9187b26a37d8833bd6616f24d.jpg"
        />
        <Component 
          title="Электронная почта" 
          subtitle="Для официальной переписки" 
          name="email" 
          selected={selectedItems.email} 
          onSelect={handleSelect}
          imageSrc="https://img.dmclk.ru/s200x200q80/vitrina/96/33/9633066a859524b9187b26a37d8833bd6616f24d.jpg"
        />
      </div>
      <ComponentConfig />
    </TokenProvider>
  );
}

export default App;