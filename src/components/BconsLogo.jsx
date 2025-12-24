import { useState } from "react";

// Thành phần Logo Bcons chính thức
const BconsLogo = ({ collapsed }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl =
    "https://bcons.com.vn/wp-content/uploads/2021/06/logobconsnew.jpg";

  return (
    <div className="flex items-center gap-3">
      <div className="min-w-[44px] h-[44px] bg-wh rounded-lg flex items-center justify-center shadow-md p-1.5 overflow-hidden border border-slate-100">
        {!imgError ? (
          <img
            src={logoUrl}
            alt="Bcons Logo"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#f1db97] flex items-center justify-center text-black font-bold text-xs">
            B
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-black text-xl leading-none tracking-tighter text-black">
            BCONS
          </span>
          <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#5c4e2c] mt-0.5 uppercase">
            Group • ERP
          </span>
        </div>
      )}
    </div>
  );
};

export default BconsLogo;
