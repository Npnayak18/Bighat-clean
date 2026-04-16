import logo from "../assets/bighaat-logo.webp";
import qr from "../assets/qr.webp";
import ig from "../assets/ig.webp";
import fb from "../assets/fb.webp";
import yt from "../assets/yt.webp";
import xt from "../assets/xt.jpg";
import ld from "../assets/ld.webp";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <img src={logo} alt="BigHaat Logo" className="footer-logo" />
          <p>
           BigHaat is one of the largest and innovative Indian full-stack AgriTech platforms that is dedicated to revolutionizing the agricultural industry in India. The platform leverages technology to provide a wide range of solutions and services to farmers, helping them optimize their agricultural practices, increase productivity, and ultimately improve their livelihoods
          </p>
          <p>
           By integrating technology, data-driven insights, and a deep understanding of the agriculture sector, BigHaat aims to improve the overall agricultural ecosystem, increase farm yields, reduce input costs, and enhance the well-being of farmers across India. The platform plays a pivotal role in bridging the gap between technology and agriculture, ultimately contributing to the growth and sustainability of the agricultural sector.
          </p>
          <h6>Download Mobile App</h6>
          <img src={qr} alt="QR Code" className="qr" />
          <div className="social-icons">
            <img src={ig} alt="Instagram" />
            <img src={fb} alt="Facebook" />
            <img src={yt} alt="YouTube" />
            <img src={xt} alt="X" />
            <img src={ld} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-middle">
          <h6>Quick Links</h6>
          <p>About Us</p>
          <p>Reach Us</p>
          <p>Media Links</p>
          <p>Privacy Policy</p>
          <p>Return & Refund Policy</p>
          <p>Terms of Service</p>
          <p>Grievance Redressal</p>
          <p>Careers</p>
          <p>Shipping / Delivery Policy</p>
          <p>FAQ</p>
          <p>Sitemap</p>
        </div>
        <div className="footer-right">
          <h6>Contact Us</h6>

          <p>Missed Call To Order:</p>
          <button className="contact-btn">1800 3000 2434</button>

          <p>Whatsapp:</p>
          <button className="contact-btn">+91 8050797979</button>

          <h6>Corporate Office:</h6>
          <p>
            BigHaat Agro Pvt Ltd <br />
            19/2, SKR Tower, <br />
            15th Cross, 4th Phase, <br />
            Dollars Layout, J.P. Nagar, <br />
            Bangalore - 560078 <br />
            Karnataka, India
          </p>
          <p className="cin">
            CIN: U74900KA2015PTC082769
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        Copyright © 2026 BigHaat Agro Private Limited
      </div>
    </footer>
  );
}

export default Footer;
