import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import BconsLogo from "./BconsLogo";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  menuItems,
  openMenus,
  setOpenMenus,
  currentView,
  handleMenuClick,
}) => {
  return (
    <aside
      className={`bg-[#ffffff] transition-all duration-300 flex flex-col shadow-2xl z-30 ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-[#ffffff1a] h-16">
        <BconsLogo collapsed={!isSidebarOpen} />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 hover:bg-[#ffffff1a] rounded-lg text-black ml-auto"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto px-2 space-y-1 no-scrollbar">
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              onClick={() =>
                item.subItems
                  ? isSidebarOpen
                    ? setOpenMenus((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((i) => i !== item.id)
                          : [...prev, item.id]
                      )
                    : setIsSidebarOpen(true)
                  : handleMenuClick(item.id, item.label, item.icon)
              }
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                (currentView === item.id || openMenus.includes(item.id)) &&
                isSidebarOpen
                  ? "bg-[#fdb913] text-[#003d7a]"
                    : "text-black hover:bg-[#ffffff1a] hover:text-[#fdb913]"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`${
                    currentView === item.id || openMenus.includes(item.id)
                      ? "text-inherit"
                      : "text-[#fdb913]"
                  }`}
                >
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <span className="ml-3 font-bold text-sm uppercase">
                    {item.label}
                  </span>
                )}
              </div>
              {isSidebarOpen && item.subItems && (
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    openMenus.includes(item.id) ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {isSidebarOpen &&
              item.subItems &&
              openMenus.includes(item.id) && (
                <div className="mt-1 ml-4 border-l-2 border-[#fdb91355] space-y-1">
                  {item.subItems.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() =>
                        sub.nestedItems
                          ? setOpenMenus((prev) =>
                              prev.includes(sub.id)
                                ? prev.filter((i) => i !== sub.id)
                                : [...prev, sub.id]
                            )
                          : handleMenuClick(
                              sub.id,
                              sub.label,
                              sub.icon
                            )
                      }
                    >
                      <div
                        className={`p-2.5 pl-4 rounded-r-xl text-xs font-bold uppercase cursor-pointer ${
                          currentView === sub.id
                            ? "text-[#fdb913] bg-[#ffffff0d]"
                            : "text-black hover:text-[#fdb913] hover:bg-[#ffffff1a]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {sub.icon} <span>{sub.label}</span>
                        </div>
                      </div>

                      {sub.nestedItems &&
                        openMenus.includes(sub.id) && (
                          <div className="mt-1 ml-4 border-l border-[#fdb91333] space-y-1">
                            {sub.nestedItems.map((nested) => (
                              <div
                                key={nested.id}
                                onClick={() =>
                                  handleMenuClick(
                                    nested.id,
                                    nested.label,
                                    nested.icon
                                  )
                                }
                                className={`p-2 pl-4 text-[10px] font-bold uppercase cursor-pointer ${
                                  currentView === nested.id
                                    ? "text-[#fdb913]"
                                    : "text-black hover:text-[#fdb913]"
                                }`}
                              >
                                {nested.label}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
