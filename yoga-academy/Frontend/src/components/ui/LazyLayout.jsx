import { Suspense } from "react";
import { PropTypes } from "prop-types";

const LazyLayout = ({ component: Component, ...rest }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component {...rest} />
    </Suspense>
  );
};

LazyLayout.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default LazyLayout;
