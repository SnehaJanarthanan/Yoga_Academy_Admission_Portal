import AboutPage1 from "../../components/ui/aboutpageone";
import Navbar from "../../components/ui/navbar";
import Header from "../../components/ui/header";
import Footer from "../../components/ui/footer";
const About = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <aside className="w-64 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <Navbar />
        </aside>
        <div className="flex flex-col flex-grow">
          <AboutPage1 />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
