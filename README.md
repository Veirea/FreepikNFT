# 📸 Freepik NFT Viewer – Dự án NFT Giới Hạn Lượt Xem

> ⚡ Môn học: Blockchain và Ứng dụng  
> 📅 Thực hiện: Tháng 6/2025  
> 👨‍💻 Nhóm: [7]  
> 🏫 Trường: [Trường Đại Học Đại Nam]

---

## 🚀 Mục tiêu

Xây dựng một hệ thống web cho phép:
- Quản lý ảnh số dưới dạng NFT.
- Mỗi ảnh có **giới hạn lượt xem** (ví dụ: 5 lần).
- Người dùng **xem ảnh gốc nếu có NFT** và chưa hết lượt.
- Khi hết lượt → popup hiện yêu cầu **mua thêm lượt xem**.

---

## 🧱 Kiến trúc hệ thống

### 📦 Frontend
- **ReactJS** (Vite hoặc CRA)
- Giao diện thư viện ảnh giống Freepik
- Kết nối ví Metamask
- Xử lý IPFS Gateway fallback để tải ảnh nhanh hơn
- Popup xác nhận trước khi xem ảnh gốc

### ⚙️ Smart Contract
- Viết bằng Solidity (Remix IDE)
- Triển khai trên mạng thử nghiệm **Sepolia**
- Dựa trên chuẩn **ERC-721 (NFT)**
- Mỗi token có:
  - URI ảnh (IPFS)
  - Biến `remainingViews` theo `mapping(tokenId => uint)`
- Hàm chính:
  - `mint(tokenURI)`
  - `viewImage(tokenId)`
  - `getRemainingViews(tokenId)`

---

## 📡 Công nghệ sử dụng

| Công nghệ       | Mô tả                                     |
|----------------|--------------------------------------------|
| ReactJS        | Giao diện web                              |
| ethers.js      | Tương tác smart contract từ trình duyệt     |
| Solidity       | Viết smart contract trên Remix IDE         |
| IPFS (via Pinata) | Lưu trữ ảnh phân tán                    |
| MetaMask       | Kết nối ví người dùng                      |
| Sepolia ETH    | Mạng thử nghiệm Ethereum                   |

---

## 📂 Cấu trúc thư mục
view-limited-nft/

├── abi/ # ABI của smart contract

├── public/

├── src/

│ ├── App.js # Logic chính frontend

│ └── App.css # CSS giao diện

├── contracts/ # (trong Remix) Smart contract

├── README.md


---

## 💡 Điểm nổi bật

- ✅ Ứng dụng thực tế của NFT vượt khỏi sưu tầm (gắn quyền truy cập số).
- ⏳ Cơ chế **giới hạn lượt xem** tăng tính khan hiếm.
- 💳 Dễ dàng tích hợp chức năng **mua thêm lượt xem** bằng ETH.
- 🌀 Tự động chuyển IPFS gateway nếu lỗi mạng.

---

## 📷 Giao diện Demo

| Thư viện ảnh chính                 | Popup ảnh gốc từ IPFS                     |
|-----------------------------------|-------------------------------------------|
| ![trả phí gas để xem ảnh](https://github.com/user-attachments/assets/2cc10edc-da39-456f-b8e7-b8c8a81c5b78)| ![sau khi trả gas sẽ được xem ảnh gốc](https://github.com/user-attachments/assets/f760f70e-af41-49fc-b92a-1eedb99eb0b6) |



---

## ⚠️ Hạn chế & Hướng phát triển

### Hạn chế
- IPFS vẫn có thể bị chậm nếu mạng yếu.
- Cần mở rộng cơ chế mua thêm lượt xem bằng smart contract.

### Định hướng mở rộng
- Tích hợp thanh toán bằng ETH hoặc stablecoin.
- Cho phép người dùng tạo NFT và tùy chọn số lượt xem.
- Giao diện quản trị quản lý NFT và lượt xem.

---

## 📜 License

MIT – Dự án phục vụ mục đích học tập, không dùng thương mại.
