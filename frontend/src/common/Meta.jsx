import { Helmet } from "react-helmet";

const Meta = ({ title = "B-Ballers Jersey Store", description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keywords}></meta>
    </Helmet>
  );
};

export default Meta;
