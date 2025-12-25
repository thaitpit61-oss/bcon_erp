import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Home,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  X,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Plus,
  ChevronDown,
  UserPlus,
  Calendar,
  MessageSquare,
  UserCheck,
  ClipboardList,
  Download,
  Printer,
  RefreshCw,
  Save,
  Edit3,
  Trash2,
  Upload,
  Share2,
  HelpCircle,
  Target,
  CreditCard,
  Book,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";

import BconsLogo from "./components/BconsLogo";
import Sidebar from "./components/Sidebar";

<div className="p-4">
  <BconsLogo collapsed />
</div>;

// ===== DEFAULT DATA =====
const DEFAULT_CUSTOMER_FORM = {
  ten: "",
  maKH: "",
  ngaySinh: "",
  diDong: "",
  soGiayTo: "",
  dcLienLac: "",
  dcThuongTru: "",
  email: "",
  maThue: "",
  chucVu: "",
  dvCongTac: "",
  nhomKH: "Standard",
  nhanVien: "Admin",
  ngheNghiep: "",
  duAn: "Bcons City",
  loaiBDS: "Căn hộ",
  spQuanTam: "",
  nguonDen: "Website",
  capDo: "Mới",
  mucDich: "Ở thực",
  dienGiai: "",
  ngayXuLy: "",
  dsDuAn: "",
  loaiGiayTo: "CCCD",
  soCCCD: "",
  passport: "",
  noiCap: "",
  ngayCap: "",
  gioiTinh: "Nam",
  maKHFast: "",
  ngayDongBo: "",
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("crm-1");
  const [activeTab, setActiveTab] = useState("crm-1");
  const [openMenus, setOpenMenus] = useState(["crm", "crm-opp"]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tabs, setTabs] = useState([
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { id: "crm-1", title: "Danh mục khách hàng", icon: <Users size={16} /> },
  ]);

  const [customers, setCustomers] = useState([
    {
      maKH: "KH001",
      ngaySinh: "1985-05-15",
      diDong: "0901234567",
      capDo: "Tiềm năng",
      hoTenFull: "Nguyễn Văn An",
      daDongBo: true,
    },
    {
      maKH: "KH002",
      ngaySinh: "1992-10-20",
      diDong: "0987654321",
      capDo: "Mới",
      hoTenFull: "Lê Thị Bình",
      daDongBo: false,
    },
  ]);

  const [newCustomer, setNewCustomer] = useState(DEFAULT_CUSTOMER_FORM);

  const handleInputChange = ({ target }) => {
    setNewCustomer((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSaveCustomer = () => {
    // determine next numeric suffix from existing maKH values (KH###)
    const nextNum = (() => {
      const nums = customers
        .map((c) => c.maKH)
        .filter(Boolean)
        .map((s) => {
          const m = String(s).match(/KH0*([0-9]+)/i);
          return m ? parseInt(m[1], 10) : 0;
        });
      const max = nums.length ? Math.max(...nums) : 0;
      return max + 1;
    })();

    const maKH = `KH${String(nextNum).padStart(3, "0")}`;

    const customer = {
      ...newCustomer,
      maKH,
      hoTenFull: `${newCustomer.hoDem} ${newCustomer.ten}`.trim(),
      daDongBo: false,
    };

    setCustomers((prev) => [customer, ...prev]);
    setShowAddModal(false);
    setNewCustomer(DEFAULT_CUSTOMER_FORM);
  };

  const menuItems = [
    {
      id: "sys",
      label: "Hệ thống",
      icon: <Settings size={20} />,
    },
    {
      id: "contract",
      label: "Hợp đồng",
      icon: <FileText size={20} />,
      subItems: [
        { id: "ct-1", label: "Danh sách hợp đồng" },
        { id: "ct-2", label: "Hợp đồng chờ duyệt" },
      ],
    },
    { 
      id: "product",
      label: "Sản phẩm",
      icon: <Home size={20} />,
    },
    {
      id: "crm",
      label: "CRM (Khách hàng)",
      icon: <Users size={20} />,
      subItems: [
        { id: "crm-1", label: "Danh mục khách hàng" },
        { id: "crm-2", label: "Khách hàng tiềm năng" },
        {
          id: "crm-opp",
          label: "Cơ hội",
          nestedItems: [
            { id: "opp-1", label: "Danh sách cơ hội" },
            { id: "opp-2", label: "Danh sách báo giá" },
          ],
        },
      ],
    },
  ];

  const handleMenuClick = (id, label, icon) => {
    setCurrentView(id);
    setActiveTab(id);

    setTabs((prev) =>
      prev.find((t) => t.id === id)
        ? prev
        : [...prev, { id, title: label, icon }]
    );
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;

    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);

    if (activeTab === id) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <div className="flex h-screen bg-white text-slate-800 font-sans overflow-hidden">
      {/* SIDEBAR */}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={menuItems}
        openMenus={openMenus}
        setOpenMenus={setOpenMenus}
        currentView={currentView}
        handleMenuClick={handleMenuClick}
      />

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center flex-1 max-w-xl relative">
            <Search className="absolute left-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm nhanh..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-4 focus:ring-[#0054a61a] outline-none text-slate-900 transition-all"
            />
          </div>
          <div className="flex items-center space-x-4 text-slate-900 font-bold text-xs uppercase">
            <span>Admin: Lê Anh Tuấn</span>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <Bell size={20} className="text-[#0054a6] cursor-pointer" />
          </div>
        </header>

        {/* TABS */}
        <div className="bg-slate-50 px-4 pt-2 flex items-end space-x-1 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                setCurrentView(tab.id);
                setActiveTab(tab.id);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl text-[11px] font-black uppercase cursor-pointer border-t border-x transition-all ${
                activeTab === tab.id
                  ? "bg-white text-[#0054a6] border-slate-200 border-t-2 border-t-[#0054a6] -mb-[1px] shadow-sm"
                  : "text-slate-400 hover:bg-slate-100 border-transparent"
              }`}
            >
              <span>{tab.title}</span>
              <X
                size={14}
                className="ml-2 hover:text-red-500 rounded p-0.5"
                onClick={(e) => closeTab(tab.id, e)}
              />
            </div>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="bg-white border-b border-slate-200 p-2 flex items-center gap-1 shadow-sm overflow-x-auto no-scrollbar">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex flex-col items-center w-16 h-12 text-[#0054a6] hover:bg-blue-50 rounded-lg"
          >
            <Plus size={18} />
            <span className="text-[10px] font-black uppercase mt-1">
              MỚI (F2)
            </span>
          </button>
          <button className="flex flex-col items-center w-16 h-12 text-green-600 hover:bg-green-50 rounded-lg">
            <Save size={18} />
            <span className="text-[10px] font-black uppercase mt-1">
              LƯU (F3)
            </span>
          </button>
          <button className="flex flex-col items-center w-16 h-12 text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 size={18} />
            <span className="text-[10px] font-black uppercase mt-1">
              XÓA (F8)
            </span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <button className="flex flex-col items-center w-16 h-12 text-[#0054a6] hover:bg-slate-50 rounded-lg">
            <RefreshCw size={18} />
            <span className="text-[10px] font-black uppercase mt-1">NẠP</span>
          </button>
          <button className="flex flex-col items-center w-16 h-12 text-[#0054a6] hover:bg-slate-50 rounded-lg">
            <Download size={18} />
            <span className="text-[10px] font-black uppercase mt-1">XUẤT</span>
          </button>
        </div>

        {/* WORKSPACE - BẢNG 35 CỘT */}
        <div className="flex-1 p-4 bg-[#fffdf0] overflow-hidden">
          <div className="h-full bg-white rounded-2xl shadow-xl border border-[#fdb91333] flex flex-col overflow-hidden">
            {currentView === "crm-1" ? (
              <>
                <div className="p-4 border-b border-slate-100 bg-[#fdb9130a] flex justify-between items-center">
                  <h2 className="font-black text-[#0054a6] text-sm uppercase border-l-4 border-[#fdb913] pl-3">
                    Danh Mục Khách Hàng
                  </h2>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">
                    Cơ sở dữ liệu tập trung BCONS
                  </span>
                </div>

                {/* Lưới dữ liệu chính */}
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-sm border-collapse min-w-[4500px]">
                    <thead className="bg-[#fffdf0] text-[#0054a6] sticky top-0 z-20 shadow-sm uppercase font-black">
                      <tr>
                        {/* Cột cố định trái */}
                        <th className="p-3 sticky left-0 bg-[#fffdf0] z-30 border-b border-slate-200 min-w-[120px] shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                          Mã khách hàng
                        </th>
                        <th className="p-3 sticky left-[120px] bg-[#fffdf0] z-30 border-b border-slate-200 min-w-[200px] shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                          Họ và tên
                        </th>
                        {/* Các cột còn lại */}
                        <th className="p-3 border-b border-slate-200 min-w-[100px]">
                          Giới tính
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[120px]">
                          Ngày sinh
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[150px]">
                          Di động
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[120px]">
                          Loại giấy tờ
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[150px]">
                          Số giấy tờ
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[150px]">
                          Số CCCD
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[120px]">
                          Passport
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[150px]">
                          Nơi cấp
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[120px]">
                          Ngày cấp
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[250px]">
                          Địa chỉ liên lạc
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[250px]">
                          Địa chỉ thường trú
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[200px]">
                          Email
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[140px]">
                          Mã thuế TNCN
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[160px]">
                          Chức vụ
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[180px]">
                          Đơn vị công tác
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[160px]">
                          Nghề nghiệp
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[140px]">
                          Nhóm KH
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[160px]">
                          Nhân viên
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[180px]">
                          Dự án
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[130px]">
                          Loại BĐS
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[200px]">
                          Sản phẩm quan tâm
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[150px]">
                          Nguồn đến
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[140px]">
                          Cấp độ
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[150px]">
                          Mục đích
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[130px]">
                          Ngày xử lý
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[300px]">
                          Danh Sách Dự Án
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[250px]">
                          Diễn giải
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[140px]">
                          Mã KH Fast
                        </th>
                        <th className="p-3 border-b border-slate-200 min-w-[130px]">
                          Ngày đồng bộ
                        </th>
                        <th className="p-3 border-b border-slate-200 text-center min-w-[100px]">
                          Đã đồng bộ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-slate-700">
                      {customers.map((cust, i) => (
                        <tr
                          key={i}
                          className="hover:bg-[#fdb9130f] border-b border-slate-50 transition-colors group cursor-pointer"
                        >
                          {/* Cột cố định trái */}
                          <td className="p-3 sticky left-0 bg-white group-hover:bg-[#fffdf0] z-20 font-black text-[#0054a6] border-r border-slate-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                            {cust.maKH}
                          </td>
                          <td className="p-3 sticky left-[120px] bg-white group-hover:bg-[#fffdf0] z-20 font-bold text-slate-900 border-r border-slate-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                            {cust.hoTenFull}
                          </td>

                          {/* Dữ liệu hàng */}
                          <td className="p-3">{cust.hoDem}</td>
                          <td className="p-3">{cust.gioiTinh}</td>
                          <td className="p-3">{cust.ngaySinh}</td>
                          <td className="p-3 font-bold text-slate-900">
                            {cust.diDong}
                          </td>
                          <td className="p-3 uppercase">{cust.loaiGiayTo}</td>
                          <td className="p-3 font-mono">{cust.soGiayTo}</td>
                          <td className="p-3 font-mono">{cust.soCCCD}</td>
                          <td className="p-3 font-mono">{cust.passport}</td>
                          <td className="p-3">{cust.noiCap}</td>
                          <td className="p-3">{cust.ngayCap}</td>
                          <td className="p-3 truncate max-w-[250px]">
                            {cust.dcLienLac}
                          </td>
                          <td className="p-3 truncate max-w-[250px]">
                            {cust.dcThuongTru}
                          </td>
                          <td className="p-3 text-[#0054a6] italic font-semibold">
                            {cust.email}
                          </td>
                          <td className="p-3 font-mono">{cust.maThue}</td>
                          <td className="p-3">{cust.chucVu}</td>
                          <td className="p-3">{cust.dvCongTac}</td>
                          <td className="p-3">{cust.ngheNghiep}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-black border border-slate-200">
                              {cust.nhomKH}
                            </span>
                          </td>
                          <td className="p-3 font-semibold">{cust.nhanVien}</td>
                          <td className="p-3 font-black uppercase text-[#0054a6]">
                            {cust.duAn}
                          </td>
                          <td className="p-3">{cust.loaiBDS}</td>
                          <td className="p-3">{cust.spQuanTam}</td>
                          <td className="p-3">{cust.nguonDen}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-[#fdb91322] text-[#8a6d00] font-black uppercase text-[11px]">
                              {cust.capDo}
                            </span>
                          </td>
                          <td className="p-3">{cust.mucDich}</td>
                          <td className="p-3">{cust.ngayXuLy}</td>
                          <td className="p-3 text-sm italic">
                            {cust.dsDuAn}
                          </td>
                          <td className="p-3 truncate max-w-[250px] text-slate-500">
                            {cust.dienGiai}
                          </td>
                          <td className="p-3 font-mono text-slate-500 uppercase">
                            {cust.maKHFast}
                          </td>
                          <td className="p-3 text-slate-400">
                            {cust.ngayDongBo}
                          </td>
                          <td className="p-3 text-center">
                            {cust.daDongBo ? (
                              <div className="flex items-center justify-center text-green-600 gap-1 font-black">
                                <CheckCircle2 size={14} /> OK
                              </div>
                            ) : (
                              <div className="flex items-center justify-center text-slate-300 gap-1 font-bold">
                                <RefreshCw size={14} /> NO
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-10 opacity-10">
                <img
                  src="https://bcons.com.vn/wp-content/uploads/2021/03/logo-bcons.png"
                  alt="Bcons"
                  className="w-64 grayscale"
                />
                <p className="font-black text-4xl text-[#0054a6] tracking-widest mt-4">
                  BCONS GROUP ERP
                </p>
              </div>
            )}
          </div>

          {/* MODAL THÊM MỚI (Tối ưu cho 35 trường) */}
          {showAddModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden border-t-[10px] border-[#f08e1d]">
                <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                  <h3 className="font-black text-[#003d7a] uppercase tracking-wider flex items-center gap-2">
                    <UserPlus size={24} /> THÊM MỚI KHÁCH HÀNG
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-[#fffdf0]/30 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* KHỐI 1: CƠ BẢN */}
                    <div className="lg:col-span-4">
                      <h4 className="font-black text-[10px] text-[#0054a6] border-b-2 border-[#fdb913] pb-1 uppercase tracking-widest mb-4">
                        I. THÔNG TIN CƠ BẢN
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="hoDem"
                        value={newCustomer.hoDem}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Giới tính
                      </label>
                      <select
                        name="gioiTinh"
                        value={newCustomer.gioiTinh}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all"
                      >
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name="ngaySinh"
                        value={newCustomer.ngaySinh}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-bold">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Số di động *
                      </label>
                      <input
                        type="text"
                        name="diDong"
                        value={newCustomer.diDong}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                        placeholder="090..."
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={newCustomer.email}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Nghề nghiệp
                      </label>
                      <input
                        type="text"
                        name="ngheNghiep"
                        value={newCustomer.ngheNghiep}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>

                    {/* KHỐI 2: ĐỊNH DANH */}
                    <div className="lg:col-span-4 mt-4">
                      <h4 className="font-black text-[10px] text-[#0054a6] border-b-2 border-[#fdb913] pb-1 uppercase tracking-widest mb-4">
                        II. GIẤY TỜ ĐỊNH DANH
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Loại giấy tờ
                      </label>
                      <select
                        name="loaiGiayTo"
                        value={newCustomer.loaiGiayTo}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all"
                      >
                        <option>CCCD</option>
                        <option>Passport</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Số giấy tờ (CCCD)
                      </label>
                      <input
                        type="text"
                        name="soGiayTo"
                        value={newCustomer.soGiayTo}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Passport
                      </label>
                      <input
                        type="text"
                        name="passport"
                        value={newCustomer.passport}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Mã thuế TNCN
                      </label>
                      <input
                        type="text"
                        name="maThue"
                        value={newCustomer.maThue}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Nơi cấp
                      </label>
                      <input
                        type="text"
                        name="noiCap"
                        value={newCustomer.noiCap}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Ngày cấp
                      </label>
                      <input
                        type="date"
                        name="ngayCap"
                        value={newCustomer.ngayCap}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>

                    {/* KHỐI 3: ĐỊA CHỈ */}
                    <div className="lg:col-span-4 mt-4">
                      <h4 className="font-black text-[10px] text-[#0054a6] border-b-2 border-[#fdb913] pb-1 uppercase tracking-widest mb-4">
                        III. ĐỊA CHỈ
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Địa chỉ liên lạc
                      </label>
                      <input
                        type="text"
                        name="dcLienLac"
                        value={newCustomer.dcLienLac}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Địa chỉ thường trú
                      </label>
                      <input
                        type="text"
                        name="dcThuongTru"
                        value={newCustomer.dcThuongTru}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                      />
                    </div>

                    {/* KHỐI 4: CRM */}
                    <div className="lg:col-span-4 mt-4">
                      <h4 className="font-black text-[10px] text-[#0054a6] border-b-2 border-[#fdb913] pb-1 uppercase tracking-widest mb-4">
                        IV. THÔNG TIN CRM & KINH DOANH
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Dự án quan tâm
                      </label>
                      <select
                        name="duAn"
                        value={newCustomer.duAn}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all font-black"
                      >
                        <option>Bcons City</option>
                        <option>Bcons Polaris</option>
                        <option>Bcons Garden</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Loại BĐS
                      </label>
                      <select
                        name="loaiBDS"
                        value={newCustomer.loaiBDS}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all"
                      >
                        <option>Căn hộ</option>
                        <option>Shophouse</option>
                        <option>Officetel</option>
                        <option>Đất nền</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Sản phẩm quan tâm cụ thể
                      </label>
                      <input
                        type="text"
                        name="spQuanTam"
                        value={newCustomer.spQuanTam}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all"
                        placeholder="Vd: Block A - Tầng 10 - 2PN"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Nguồn đến
                      </label>
                      <select
                        name="nguonDen"
                        value={newCustomer.nguonDen}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all"
                      >
                        <option>Website</option>
                        <option>Facebook</option>
                        <option>Bạn bè</option>
                        <option>Hotline</option>
                        <option>Tư vấn trực tiếp</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Cấp độ khách hàng
                      </label>
                      <select
                        name="capDo"
                        value={newCustomer.capDo}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all"
                      >
                        <option>Mới</option>
                        <option>Tiềm năng</option>
                        <option>Cơ hội</option>
                        <option>Đã mua</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Mục đích mua
                      </label>
                      <select
                        name="mucDich"
                        value={newCustomer.mucDich}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm bg-white outline-none focus:border-[#0054a6] transition-all"
                      >
                        <option>Ở thực</option>
                        <option>Đầu tư</option>
                        <option>Cho thuê</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Mã KH Fast (Nguồn kế toán)
                      </label>
                      <input
                        type="text"
                        name="maKHFast"
                        value={newCustomer.maKHFast}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all uppercase font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-4">
                      <label className="text-[10px] font-black uppercase text-slate-500">
                        Diễn giải / Ghi chú chi tiết
                      </label>
                      <textarea
                        name="dienGiai"
                        value={newCustomer.dienGiai}
                        onChange={handleInputChange}
                        className="border p-2 rounded-lg text-sm outline-none focus:border-[#0054a6] transition-all h-20 resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all"
                  >
                    HỦY BỎ
                  </button>
                  <button
                    onClick={handleSaveCustomer}
                    className="px-10 py-2 bg-[#f08e1d] text-white rounded-xl text-sm font-black hover:bg-[#ec850f] shadow-lg shadow-blue-200 flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Save size={18} /> LƯU KHÁCH HÀNG
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
