import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const PageWrapper = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      <Navbar />
      <Sidebar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageWrapper;
