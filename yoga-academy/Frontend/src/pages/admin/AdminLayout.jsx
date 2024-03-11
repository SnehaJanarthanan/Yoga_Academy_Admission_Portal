import PropTypes from "prop-types";

const AdminLayout = (props) => {
  console.log("dgdgd");

  return (
    <div>
      <aside>{props}</aside>
      <main></main>
    </div>
  );
};

AdminLayout.PropTypes = {
  children: PropTypes.element.isRequired,
};
export default AdminLayout;
