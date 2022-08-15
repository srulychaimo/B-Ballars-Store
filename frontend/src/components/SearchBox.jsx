import { useFormik } from "formik";
import { Form, Button, FormControl } from "react-bootstrap";
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
    <Form onSubmit={form.handleSubmit} className="d-flex">
      <FormControl
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        {...form.getFieldProps("keyword")}
      ></FormControl>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
