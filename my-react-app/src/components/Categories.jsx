import "./Categories.css";
import b1 from "../assets/b1.webp";
import b2 from "../assets/b2.webp";
import b3 from "../assets/b3.webp";
import b4 from "../assets/b4.webp";
import b5 from "../assets/b5.webp";
import b6 from "../assets/b6.webp";
import b7 from "../assets/b7.webp";
import b8 from "../assets/b8.webp";
import b9 from "../assets/b9.webp";
import b10 from "../assets/b10.webp";
import b11 from "../assets/b11.webp";
import b12 from "../assets/b12.webp";
function Categories() {
  return (
    <div className="categories">
      <h3>Categories</h3>
      <div className="categoryrow">
        <div className="categorycard">
          <img src={b1} />
          <p>Offers</p>
        </div>
        <div className="categorycard">
          <img src={b2} />
          <p>Insecticides</p>
        </div>
        <div className="categorycard">
          <img src={b3} />
          <p>Nutrients</p>
        </div>
        <div className="categorycard">
          <img src={b4} />
          <p>Fungicides</p>
        </div>
        <div className="categorycard">
          <img src={b5} />
          <p>Vegetable & Fruit Seeds</p>
        </div>
        <div className="categorycard">
          <img src={b6} />
          <p>Herbicides</p>
        </div>
        <div className="categorycard">
          <img src={b7} />
          <p>Growth Promoters</p>
        </div>
        <div className="categorycard">
          <img src={b8} />
          <p>Farm Machinery</p>
        </div>
        <div className="categorycard">
          <img src={b9} />
          <p>Flower Seeds</p>
        </div>
        <div className="categorycard">
          <img src={b10} />
          <p>Organic Farming</p>
        </div>
        <div className="categorycard">
          <img src={b11} />
          <p>Animal Husbandry</p>
        </div>
        <div className="categorycard">
          <img src={b12} />
          <p>New Arrivals</p>
        </div>
      </div>
    </div>
  );
}

export default Categories;
