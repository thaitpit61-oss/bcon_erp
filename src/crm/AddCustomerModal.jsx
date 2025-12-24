import { X, Save } from "lucide-react";

export default function AddCustomerModal({ onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[600px]">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold">Thêm khách hàng</h3>
          <X onClick={onClose} />
        </div>

        <input className="border w-full mb-2 p-2" placeholder="Họ tên" />
        <input className="border w-full mb-2 p-2" placeholder="SĐT" />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Hủy</button>
          <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2">
            <Save /> Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
