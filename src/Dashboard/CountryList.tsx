import { Button, Card, Col, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { ApplicationState } from "../state/Application/Reducer";

interface Props {
  countryList: ApplicationState[];
  activeMenu: string;
}

const CountryList = ({ countryList, activeMenu }: Props) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredList = useMemo(() => {
    return activeMenu === "All"
      ? countryList
      : countryList.filter((country) => country.region === activeMenu);
  }, [countryList, activeMenu]);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeMenu]);

  const displayedList = useMemo(() => {
    return filteredList.slice(0, visibleCount);
  }, [filteredList, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <Row className="g-4">
        {displayedList.map((country, index) => (
          <Col sm={12} md={6} key={`${country.name}-${index}`}>
            <Card className="card-contents h-100">
              <Card.Img
                variant="top"
                className="country-img"
                src={country.flag}
                alt={country.name}
              />
              <Card.Body>
                <h5 className="mb-1">{country.name}</h5>
                <p className="text-muted">{country.region}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {visibleCount < filteredList.length && (
        <div className="text-center my-4">
          <Button className="btn-load" variant="none" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default CountryList;
