import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../store/actions/productActions";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productTopRated
  );

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark" prevLabel="" nextLabel="">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/teams/${product.team}/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption d-none d-sm-block">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
