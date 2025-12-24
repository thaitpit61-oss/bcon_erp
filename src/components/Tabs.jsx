import { X } from "lucide-react";

export default function Tabs({ tabs, activeTab, setActiveTab, closeTab }) {
  return (
    <div className="flex bg-slate-50 border-b px-4">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 cursor-pointer ${
            activeTab === tab.id ? "bg-white font-bold" : ""
          }`}
        >
          {tab.title}
          <X size={12} onClick={(e) => closeTab(tab.id, e)} />
        </div>
      ))}
    </div>
  );
}
