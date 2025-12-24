export default function CustomerTable({ customers }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th>Mã KH</th>
          <th>Họ tên</th>
          <th>Di động</th>
          <th>Cấp độ</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c, i) => (
          <tr key={i}>
            <td>{c.maKH}</td>
            <td>{c.hoTenFull}</td>
            <td>{c.diDong}</td>
            <td>{c.capDo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
