import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Investigation from './components/Investigation';
import Routine from './components/Routine';
import Reports from './components/Reports';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'investigation':
        return <Investigation />;
      case 'routine':
        return <Routine />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {renderView()}
      </main>

      {/* Persistent AI Assistant */}
      <ChatWidget />
    </div>
  );
};

export default App;