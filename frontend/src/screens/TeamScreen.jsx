import { useEffect } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { teams } from "../utils/teams";
import { useDispatch, useSelector } from "react-redux";
import { teamProducts } from "../store/actions/productActions";
import Product from "../components/Product";
import { useState } from "react";
import Meta from "../common/Meta";
import { productSortKeys, sortingProducts } from "../utils/pSortKeysAndFn";

const TeamScreen = () => {
  const { team } = useParams();
  const dispatch = useDispatch();

  const [sortedArray, setSortedArray] = useState([]);

  const { products } = useSelector((state) => state.productTeam);
  const filteredTeam = teams.find((t) => t.id === team);

  useEffect(() => {
    dispatch(teamProducts(team));
  }, [team, dispatch]);
  return (
    <>
      <Meta title={`B-Ballers Store - Team ${team}`} />
      <Container>
        <h1>{filteredTeam.name}</h1>
      </Container>

      <Image
        src={filteredTeam.banner}
        alt={filteredTeam.name}
        fluid
        className="vw-100"
      ></Image>

      <Container>
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
      </Container>
    </>
  );
};

export default TeamScreen;
