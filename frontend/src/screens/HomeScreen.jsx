import { Col, Image, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { useEffect } from "react";
import { listProducts } from "../store/actions/productActions";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../common/Meta";

const HomeScreen = () => {
  const { keyword, pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const { loading, error, products, pages, page } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <Image
            src="https://store.nba.com/content/ws/all/c4d32bbb-2e16-439d-b5a8-40ae6607b11c__1600X617.jpg"
            alt="main image"
            className="mt-4"
            fluid
          ></Image>
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>latest products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
