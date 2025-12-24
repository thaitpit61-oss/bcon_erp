import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="h-14 border-b flex justify-between items-center px-6">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} />
        <input className="w-full pl-10 border rounded-xl py-2" placeholder="Tìm kiếm..." />
      </div>
      <div className="flex items-center gap-4 text-sm font-bold">
        Admin: Lê Anh Tuấn
        <Bell size={18} />
      </div>
    </header>
  );
}
