import Foot from "../components/Foot/foot";
import Header from "../components/header/header";

const withLayout = (WrappedComponent) => {
  return (props) => (
    <>
      <Header />
      <main className="min-h-screen">
        <WrappedComponent {...props} />
      </main>
    </>
  );
};

export default withLayout;
