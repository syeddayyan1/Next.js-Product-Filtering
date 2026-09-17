const ProductCard = ({ product }) => {
    return (
      <div>
      <img src={product.thumbnail} alt={product.title} />

      <h2>{product.title}</h2>

      <p>${product.price}</p>

      <p>{product.category}</p>
    </div>
  ); 
};

export default ProductCard;