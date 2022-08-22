import { useFormik } from "formik";
import { Form, Button, FormControl, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit(values) {
      if (values.keyword.trim()) {
        navigate(`/search/${values.keyword}`);
      } else {
        navigate("/");
      }
    },
  });

  return (
    <Form onSubmit={form.handleSubmit}>
      <Row>
        <Col xs={9} sm={8} md={6} xl={10} className="pr-0 pr-sm-2 pr-xl-0">
          <FormControl
            placeholder="Search Products..."
            {...form.getFieldProps("keyword")}
          ></FormControl>
        </Col>
        <Col xs={2} className="pl-0 pl-sm-2 pl-xl-0">
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
