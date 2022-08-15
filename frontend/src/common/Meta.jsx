import { Helmet } from "react-helmet";

const Meta = ({ title = "Welcome To NBA shop", description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keywords}></meta>
    </Helmet>
  );
};

export default Meta;
