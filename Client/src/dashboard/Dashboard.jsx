import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MetricCards from './MetricCards';
import CampaignTypesChart from './CampaignTypesChart';
import TopAutomations from './TopAutomations';
import RecentCampaigns from './RecentCampaigns';
import { NewCampaignModal, CreateAutomationModal } from './Modals';


// Initial Mock Datasets
const INITIAL_CAMPAIGNS = [
  { id: '1', name: 'Spring Sale Launch', status: 'Active', sent: 2450, opens: 1089, date: 'Mar 15, 2025' },
  { id: '2', name: 'Weekly Newsletter #12', status: 'Scheduled', sent: 3100, opens: 0, date: 'Mar 25, 2025' },
  { id: '3', name: 'Abandoned Cart Recovery', status: 'Active', sent: 1250, opens: 840, date: 'Mar 18, 2025' },
  { id: '4', name: 'Product Update Q1', status: 'Completed', sent: 5000, opens: 3200, date: 'Mar 5, 2025' },
];

const INITIAL_AUTOMATIONS = [
  { id: '1', name: 'Welcome Series', rate: 87.1, triggered: 342, completed: 298 },
  { id: '2', name: 'Re-engagement Campaign', rate: 57.0, triggered: 156, completed: 89 },
];

const INITIAL_NOTIFICATIONS = [
  { id: '1', text: "Campaign 'Spring Sale Launch' was launched successfully.", time: "10 mins ago", read: false },
  { id: '2', text: "Welcome Series automation reached 87.1% conversion rate.", time: "1 hour ago", read: false },
  { id: '3', text: "Server integration completed successfully.", time: "Yesterday", read: true }
];

export default function Dashboard() {
  // Navigation & Drawer states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Modal toggle states
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isCreateAutomationOpen, setIsCreateAutomationOpen] = useState(false);

  // Application Data states
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [automations, setAutomations] = useState(INITIAL_AUTOMATIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications callbacks
  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddNotification = (text) => {
    const newNotif = {
      id: Date.now().toString(),
      text,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Campaigns callbacks
  const handleAddCampaign = (newCamp) => {
    setCampaigns(prev => [newCamp, ...prev]);
    handleAddNotification(`New campaign '${newCamp.name}' created successfully.`);
  };

  const handleUpdateCampaign = (id, updatedFields) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    const camp = campaigns.find(c => c.id === id);
    if (camp && updatedFields.status) {
      handleAddNotification(`Campaign '${camp.name}' status set to ${updatedFields.status}.`);
    }
  };

  const handleDeleteCampaign = (id) => {
    const camp = campaigns.find(c => c.id === id);
    setCampaigns(prev => prev.filter(c => c.id !== id));
    if (camp) {
      handleAddNotification(`Campaign '${camp.name}' was deleted.`);
    }
  };

  // Automations callbacks
  const handleAddAutomation = (newAuto) => {
    setAutomations(prev => [newAuto, ...prev]);
    handleAddNotification(`Automation flow '${newAuto.name}' deployed.`);
  };

  // Dynamic KPI Calculations based on campaigns state
  const totalCampaignsVal = campaigns.length;
  
  // Sum contacts sent
  const totalSent = campaigns.reduce((acc, c) => acc + c.sent, 0);
  
  // Calculate average open rate
  const totalOpens = campaigns.reduce((acc, c) => acc + c.opens, 0);
  const calculatedOpenRate = totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : "0.0";

  const stats = {
    totalCampaigns: { value: totalCampaignsVal.toString(), change: "+12%", icon: "mail" },
    activeContacts: { value: (8000 + totalSent).toLocaleString(), change: "+23%", icon: "users" },
    avgOpenRate: { value: `${calculatedOpenRate}%`, change: "+5.2%", icon: "percent" },
    revenue: { value: `$${(12450 + totalCampaignsVal * 250).toLocaleString()}`, change: "-2.4%", icon: "dollar" }
  };

  return (
    <>
      <div className="h-screen w-full flex bg-gradient-to-b from-[#D4CEB8] via-[#F4F1E6] to-[#FAF9F6] text-slate-800 font-sans overflow-hidden animate-fade-in">
        <style>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-stagger {
            opacity: 0;
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .delay-0 { animation-delay: 0ms; }
          .delay-150 { animation-delay: 150ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-450 { animation-delay: 450ms; }
          .delay-600 { animation-delay: 600ms; }
          .delay-750 { animation-delay: 750ms; }
        `}</style>
        
        {/* Sidebar Navigation */}
        <div className="hidden lg:flex flex-shrink-0 h-full">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative flex flex-col bg-[#F7F5EE] w-64 h-full animate-slide-in-left z-50">
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setMobileSidebarOpen(false);
                }} 
                sidebarOpen={true}
                setSidebarOpen={() => {}}
              />
            </div>
          </div>
        )}

        {/* Main Panel Content container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* Header toolbar */}
          <Header 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onToggleAiDrawer={() => setIsAiOpen(!isAiOpen)}
            onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
            notifications={notifications}
            onDismissNotification={handleDismissNotification}
          />

          {/* Scrollable Dashboard view body */}
          <main className="flex-1 overflow-y-auto px-6 py-8 md:px-8 space-y-8 custom-scrollbar">
            
            {activeTab === 'dashboard' ? (
              <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Row 1: KPI Stats and Action buttons */}
                <MetricCards 
                  stats={stats}
                  onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
                  onOpenCreateAutomation={() => setIsCreateAutomationOpen(true)}
                />

                {/* Grid Rows Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Performance SVG Line Chart (Left 6/12) */}
                  <div className="lg:col-span-6 min-h-[340px] animate-fade-in-up-stagger delay-375">
                    <RecentCampaigns 
                      campaigns={campaigns}
                      onUpdateCampaign={handleUpdateCampaign}
                      onDeleteCampaign={handleDeleteCampaign}
                    />
                  </div>

                  {/* Campaign Types Pie Chart (Middle 3/12) */}
                  <div className="lg:col-span-3 min-h-[340px] animate-fade-in-up-stagger delay-450">
                    <CampaignTypesChart />
                  </div>

                  {/* Top Automations Widget (Right 3/12) */}
                  <div className="lg:col-span-3 min-h-[340px] animate-fade-in-up-stagger delay-525">
                    <TopAutomations automations={automations} />
                  </div>






                </div>

              </div>
            ) : (
              <div className="max-w-7xl mx-auto py-12 text-center bg-white border border-slate-200 rounded-3xl p-16 shadow-sm select-none">
                <h2 className="text-3xl font-extrabold text-slate-800 capitalize tracking-tight">{activeTab} Section</h2>
                <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                  This area showcases campaign records, reports, integrations, or configs. Click back to <button onClick={() => setActiveTab('dashboard')} className="text-ticket-orange font-bold hover:underline">Dashboard</button> to view execution statistics.
                </p>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Creation Overlays Modals */}
      <NewCampaignModal 
        isOpen={isNewCampaignOpen} 
        onClose={() => setIsNewCampaignOpen(false)}
        onAddCampaign={handleAddCampaign}
      />
      
      <CreateAutomationModal 
        isOpen={isCreateAutomationOpen} 
        onClose={() => setIsCreateAutomationOpen(false)}
        onAddAutomation={handleAddAutomation}
      />
    </>
  );
}
