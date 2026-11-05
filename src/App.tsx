import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Confetti } from './components/common/Confetti';
import { MobileAppContainer } from './components/mobile/MobileAppContainer';
import { DeviceSecurityModal } from './components/modals/DeviceSecurityModal';
import { FamilyCalendarModal } from './components/modals/FamilyCalendarModal';

const MainApp: React.FC = () => {
  const { showConfetti } = useApp();

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-slate-950 flex flex-col overflow-hidden">
      {/* Celebration Confetti */}
      <Confetti active={showConfetti} />

      {/* Global Device Security & Separation Modal */}
      <DeviceSecurityModal />

      {/* Global Family Real-Time Calendar Modal */}
      <FamilyCalendarModal />

      {/* Primary Mobile App Experience */}
      <MobileAppContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
