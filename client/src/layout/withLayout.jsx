import Footer from "../components/footer";
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
