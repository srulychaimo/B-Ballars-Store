import { useEffect } from "react";
import { Col, Form, FormControl, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { teams } from "../utils/teams";
import { useDispatch, useSelector } from "react-redux";
import { teamProducts } from "../store/actions/productActions";
import Product from "../components/Product";
import { useState } from "react";
import Meta from "../common/Meta";

const TeamScreen = () => {
  const { team } = useParams();
  const dispatch = useDispatch();

  const [sortedArray, setSortedArray] = useState([]);

  const { products } = useSelector((state) => state.productTeam);
  const filteredTeam = teams.find((t) => t.id === team);

  const sortingProducts = (option) => {
    if (option === "default") {
      setSortedArray([]);
    }
    if (option === "plth") {
      setSortedArray([...products].sort((a, b) => a.price - b.price));
    }
    if (option === "phtl") {
      setSortedArray([...products].sort((a, b) => b.price - a.price));
    }
    if (option === "rlth") {
      setSortedArray([...products].sort((a, b) => a.rating - b.rating));
    }
    if (option === "rhtl") {
      setSortedArray([...products].sort((a, b) => b.rating - a.rating));
    }
  };

  useEffect(() => {
    dispatch(teamProducts(team));
  }, [team, dispatch]);
  return (
    <>
      <Meta title={`Jersey Store - Team ${team}`} />
      <h1>{filteredTeam.name}</h1>
      <Image src={filteredTeam.banner} alt={filteredTeam.name} fluid></Image>
      <Row className="mt-5 mb-1">
        <Col>Sort By:</Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Control
            as="select"
            onChange={(e) => {
              sortingProducts(e.target.value);
            }}
          >
            <option value="default">Default</option>
            <option value="plth">Price: Lowest to Highest</option>
            <option value="phtl">Price: Highest to Lowest</option>
            <option value="rlth">Rating: Lowest to Highest</option>
            <option value="rhtl">Rating: Highest to Lowest</option>
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
    </>
  );
};

export default TeamScreen;
