import logo from "../assets/bighaat-logo.webp";
import { Link } from "react-router-dom";
const user=JSON.parse(localStorage.getItem("user"));

function Navbar() {
  return (
    <>
      <div className="topbar">
        <div>Sell on BigHaat | Bulk Order Inquiries | Corporate Site</div>
        <div className="call">Missed Call To Order: 1800-3000-2434</div>
      </div>

      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="BigHaat Logo" />
        </div>

        <div className="search">
          <input type="text" placeholder="Search products..." />
          <button>🔍</button>
        </div>

        <div className="navitems">
          <div className="lang">
            <details>
              <summary>🌐 English</summary>
              <div className="lang-list">
                <a href="#">English</a>
                <a href="#">Hindi</a>
                <a href="#">Kannada</a>
              </div>
            </details>
          </div>

          <a href="#">📦 Track Order</a>
          <Link to="/wish">❤️ Wishlist</Link>
          <Link to="/login">👤 Login</Link>
          <Link to="/cart">🛒 Cart</Link>
        </div>
      </div>

      
    <div className="categorybar">
      <div className="menuitem">
        <span>BRANDS</span>
        <div className="dropdownbox">
          <h4>SEEDS</h4>
          <p>Syngenta</p>
          <p>Namdhari</p>
          <p>Seminis</p>
          <p>East West</p>

          <h4>CROP PROTECTION</h4>
          <p>Bayer</p>
          <p>BASF</p>
          <p>FMC</p>
          <p>UPL</p>
        </div>
      </div>
      <div className="menuitem">
        <span>SEEDS</span>
        <div className="dropdownbox">
          <h4>HORTICULTURE CROPS</h4>
          <p>Vegetable Seeds</p>
          <p>Fruit Seeds</p>
          <p>Flower Seeds</p>

          <h4>FIELD CROPS</h4>
          <p>Maize / Corn</p>
          <p>Paddy</p>
          <p>Cotton</p>
        </div>
      </div>
      <div className="menuitem">
        <span>CROP PROTECTION</span>
        <div className="dropdownbox">
          <h4>CHEMICAL</h4>
          <p>Insecticides</p>
          <p>Fungicides</p>
          <p>Herbicides</p>

          <h4>BIO</h4>
          <p>Bio Insecticides</p>
          <p>Bio Fungicides</p>
        </div>
      </div>
      <div className="menuitem">
        <span>CROP NUTRITION</span>
        <div className="dropdownbox">
          <h4>FERTILIZERS</h4>
          <p>NPK Fertilizers</p>
          <p>Liquid Fertilizers</p>

          <h4>GROWTH PROMOTERS</h4>
          <p>Plant Enhancers</p>
          <p>Yield Boosters</p>
        </div>
      </div>
      <div className="menuitem">
        <span>EQUIPMENTS</span>
        <div className="dropdownbox">
          <h4>IMPLEMENTS</h4>
          <p>Sprayers</p>
          <p>Brush Cutter</p>
          <p>Weeder / Tiller</p>

          <h4>IRRIGATION</h4>
          <p>Water Pump</p>
          <p>Sprinkler</p>
          <p>Drip Kit</p>
        </div>
      </div>
<div className="menuitem">
  <span>ANIMAL HUSBANDRY</span>
  <div className="dropdownbox">
    <h4>CATTLE</h4>
    <p>Cattle Feed</p>
    <p>Cattle Supplements</p>
    <p>Milking Machine</p>
    <p>Milking Accessories</p>

    <h4>POULTRY</h4>
    <p>Poultry Feed</p>
    <p>Poultry Supplements</p>
    <p>Poultry Equipment</p>

    <h4>OTHERS</h4>
    <p>Forage Seeds</p>
    <p>Silage Culture</p>
  </div>
</div>
<div className="menuitem">
  <span>ORGANIC</span>
  <div className="dropdownbox">
    <h4>BIO / ORGANIC PESTICIDES</h4>
    <p>Bio Insecticides</p>
    <p>Bio Fungicides</p>
    <p>Bio Viricides</p>
    <p>Bio Nematicides</p>

    <h4>CROP NUTRITION</h4>
    <p>Bio Fertilizers</p>
    <p>Bio Stimulants</p>
  </div>
</div>
<div className="menuitem">
  <span>TAPAS</span>
  <div className="dropdownbox">
    <p>Crop Nutrition</p>
    <p>Crop Protection</p>
    <p>Farm Implements</p>
    <p>Traps & Lures</p>
    <p>Mulching Sheet</p>
    <p>Safety Kit</p>
    <p>Sprayers</p>
  </div>
</div>

<div className="menuitem">
  <span>SERVICES</span>
  <div className="dropdownbox">
    <p>Tractor Loan</p>
    <p>Harvester Loan</p>
    <p>Open HDFC Savings Account</p>
  </div>
</div>
<span className="simplelink">VEDIKA</span>
<span className="simplelink">BLOGS</span>
    </div>
    
    </>
  );
}
export default Navbar;
