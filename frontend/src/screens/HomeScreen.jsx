import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { listProducts } from "../store/actions/productActions";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../common/Meta";
import { productSortKeys, sortingProducts } from "../utils/pSortKeysAndFn";

const HomeScreen = () => {
  const [sortedArray, setSortedArray] = useState([]);
  const { keyword, pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const { loading, error, products, pages, page } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    if (sortedArray.length) {
      setSortedArray([]);
    }
    dispatch(listProducts(keyword, pageNumber));
    if (pageNumber !== 1) {
      window.scrollTo(0, 1080);
    }
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title="B-Ballers Store - Home" />
      {!keyword ? (
        <>
          <Container>
            <h2>our top rated products</h2>
            <ProductCarousel />
            <Link to="/teams/hardwood-classics">
              <Image
                src="https://store.nba.com/content/ws/all/c4d32bbb-2e16-439d-b5a8-40ae6607b11c__1600X617.jpg"
                alt="main image"
                className="mt-4 vw-100"
                fluid
              />
            </Link>
          </Container>
        </>
      ) : (
        <Container>
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        </Container>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Container>
          <Message variant="danger">{error}</Message>
        </Container>
      ) : products.length ? (
        <Container>
          <h1>Our Collection:</h1>
          <Row className="mt-5 mb-1">
            <Col>Sort By:</Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Control
                as="select"
                onChange={(e) => {
                  sortingProducts(e.target.value, products, setSortedArray);
                }}
              >
                {productSortKeys.map((key) => (
                  <option key={key.value} value={key.value}>
                    {key.content}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          {!sortedArray.length ? (
            <Row className="mt-3">
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="mt-3">
              {sortedArray.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Container>
      ) : (
        <Container>
          <Message variant="danger">Products not found</Message>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
