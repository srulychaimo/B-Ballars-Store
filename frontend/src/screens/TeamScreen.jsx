import { useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { teams } from "../utils/teams";
import { useDispatch, useSelector } from "react-redux";
import { teamProducts } from "../store/actions/productActions";
import Product from "../components/Product";

const TeamScreen = () => {
  const { team } = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productTeam);

  const filteredTeam = teams.find((t) => t.id === team);

  useEffect(() => {
    dispatch(teamProducts(team));
  }, [team, dispatch]);
  return (
    <>
      <h1>{filteredTeam.name}</h1>
      <Image src={filteredTeam.banner} alt={filteredTeam.name} fluid></Image>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TeamScreen;
