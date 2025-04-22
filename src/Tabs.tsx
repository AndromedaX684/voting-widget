import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex border-b mb-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-150 ${
          activeTab === tab
            ? "border-primary text-primary"
            : "border-transparent text-gray-400"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
