import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import NavigationBar from "./Navbar";
import ImageSlider from "./Slider";
import CountryList from "./CountryList";
import { useEffect, useState } from "react";
import { DashboardService } from "../services/DashboardService";
import { ApplicationState } from "../state/Application/Reducer";
import FooterBar from "../Footer/Footer";

const DashBoard = () => {
  const [activeMenu, setActiveMenu] = useState("All");
  const [countries, setCountries] = useState<ApplicationState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DashboardService.getCountryList()
      .then((res) => {
        setCountries(res);
      })
      .catch((err) => {
        console.error("Failed to fetch countries:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <NavigationBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div className="header-content">
          <div className="line-top" />
          <h1 className="title">WELCOME</h1>
          <div className="line-bot" />
        </div>
        {!loading && (
          <div className="dashboard-contents">
            <Row className="g-4">
              <Col md={12} lg={3} className="order-1 order-lg-2">
                <Card className="card-container">
                  <img src="./slide4.avif" className="img-slider" />
                </Card>
              </Col>
              <Col md={12} lg={9} className="order-2 order-lg-1">
                <ImageSlider />
              </Col>
            </Row>

            {!loading && countries.length > 0 && (
              <CountryList countryList={countries} activeMenu={activeMenu} />
            )}
          </div>
        )}
        {loading && (
          <div className="text-center">
            {" "}
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{ width: "5rem", height: "5rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </div>
        )}
        <FooterBar />
      </div>
    </>
  );
};

export default DashBoard;
