import React, { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import { CONTRACT_ABI } from "./abi";


const CONTRACT_ADDRESS = "0x19097390651afB18416d42d419d92b683250DD25";

const resolveIPFS = (cid) => `https://blue-quiet-ocelot-826.mypinata.cloud/ipfs/${cid}`;

const galleryData = [
  {
    id: 0,
    title: "NFT Demo 1",
    demo: resolveIPFS("bafybeidnbnyvfrqcw3iaxvhblzpscluw7qvmkwghe7if4mok7blgn2gnqa"),
  },
  {
    id: 1,
    title: "NFT Demo 2",
    demo: resolveIPFS("bafybeig6g7usnh4y4cviobmgcp536dvwi6hghjn3vs4kqdfgse5fifs3my"),
  },
  {
    id: 2,
    title: "NFT Demo 3",
    demo: resolveIPFS("bafybeifmv2jejdjv726ydiobqewyd6mdfeh4snapavgwhgealzz3if72jy"),
  },
  {
    id: 3,
    title: "NFT Demo 4",
    demo: resolveIPFS("bafybeieb54s6pbgficjc4oj4afyg43e2cquxe5ecyyfdwye4wpnybqk4x4"),
  },
  {
    id: 4,
    title: "NFT Demo 5",
    demo: resolveIPFS("bafybeicsvdbbfhtleicsntextwdwsaxqhhagy7sedtcc6h73nh2skwhgfm"),
  },
  {
    id: 5,
    title: "NFT Demo 6",
    demo: resolveIPFS("bafybeigl4cx4i3y3xmefg7d3aikfyj74l43nr7vcnbsebd25cmcqyehzym"),
  },
  {
    id: 6,
    title: "NFT Demo 7",
    demo: resolveIPFS("bafybeiep6ezgwgjusm2vwnamzhiwhmdd3em5jz3d57qrrpkoay5iyywsbq"),
  },
];

function App() {
  const [account, setAccount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [contract, setContract] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const instance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setAccount(accounts[0]);
      setContract(instance);
      setSelectedImage(null);
    } catch (err) {
      alert("❌ Lỗi khi kết nối ví: " + err.message);
    }
  };

  const handleImageClick = async (img) => {
    setImageSrc("");
    if (!account || !contract) {
      setSelectedImage(img);
    } else {
      try {
        await contract.viewImage(img.id);
        const uri = await contract.tokenURI(img.id);
        let finalUrl = uri;
        if (uri.startsWith("ipfs://")) {
          const cid = uri.replace("ipfs://", "");
          finalUrl = resolveIPFS(cid);
        }
        setImageSrc(finalUrl);
        setShowPopup(true);
      } catch (err) {
        alert("❌ Không có quyền hoặc đã hết lượt xem!");
        setImageSrc("");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌄 Freepik NFT Viewer</h1>
      {account && (
        <div className="wallet-info">
          <span className="wallet-label">🦊 Ví đã kết nối:</span>
          <span className="wallet-address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        </div>
      )}

      <div className="gallery">
        {galleryData.map((img) => (
          <div key={img.id} className="thumbnail" onClick={() => handleImageClick(img)}>
            <img src={img.demo} alt={img.title} className="thumb-img" />
            <p className="caption">{img.title}</p>
          </div>
        ))}
      </div>

      {showPopup && imageSrc && (
        <div className="popup-viewer">
          <div className="popup-content">
            <h3>📷 Ảnh gốc từ IPFS</h3>
            <img
              src={imageSrc}
              alt="Ảnh NFT"
              width="500"
              style={{ borderRadius: "10px" }}
              onError={() => alert("❌ Không thể tải ảnh.")}
            />
            <div className="popup-buttons">
              <button className="btn btn-buy" onClick={() => alert("🛒 Chức năng mua chưa được triển khai")}>Mua</button>
              <button className="btn" onClick={() => setShowPopup(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}


      {selectedImage && !account && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedImage.title}</h3>
            <p>🔓 Để xem ảnh gốc, vui lòng kết nối ví.</p>
            <p>🎁 Bạn có 5 lượt xem miễn phí.</p>
            <button className="btn" onClick={connectWallet}>Kết nối ví</button>
            <button className="btn" onClick={() => setSelectedImage(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
