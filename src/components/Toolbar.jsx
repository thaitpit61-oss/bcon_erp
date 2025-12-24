import { Plus, Save, Trash2, RefreshCw, Download } from "lucide-react";

export default function Toolbar({ onAdd }) {
  return (
    <div className="flex gap-2 border-b p-2">
      <button onClick={onAdd}><Plus /> Mới</button>
      <button><Save /> Lưu</button>
      <button><Trash2 /> Xóa</button>
      <button><RefreshCw /> Nạp</button>
      <button><Download /> Xuất</button>
    </div>
  );
}
