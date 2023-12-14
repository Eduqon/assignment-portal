import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";

function Header({ services, onOpen }) {
  const [gap, setGap] = useState("3rem");
  const [path, setPath] = useState("/");
  const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(
      typeof window !== "undefined" && window.innerWidth
    );
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };
  const isMobileView = useCheckMobileScreen();

  useEffect(() => {
    isMobileView ? setGap("1rem") : setGap("3rem");
  }, [isMobileView]);

  useEffect(() => {
    setPath(typeof window !== "undefined" && window.location.pathname);
  }, [path]);

  const HomePath = path === "/" ? "activeTab" : "";
  const SamplesPath = path === "/samples" ? "activeTab" : "";
  const ReviewsPath = path === "/reviews" ? "activeTab" : "";
  const ContactPath = path === "/contact" ? "activeTab" : "";
  const BlogPath = path === "/blog" ? "activeTab" : "";

  return (
    <Navbar expand="lg" style={{ zIndex: "22" }}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/assets/newDesigns/assignment-santa-logo.png"
            alt="assignment santa logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          style={{ flexGrow: "unset", gap: "2rem" }}
        >
          <Nav
            className="me-auto my-2 my-lg-0 activeTab"
            navbarScroll
            style={{ gap: gap }}
          >
            <Nav.Link href="/" id={HomePath}>
              Home
            </Nav.Link>
            <NavDropdown title="Services" id="navbarScrollingDropdown">
              {services &&
                services.data.map((service) => {
                  return (
                    <NavDropdown.Item
                      href={`/service/${service.attributes.slug}`}
                    >
                      {service.attributes.title}
                    </NavDropdown.Item>
                  );
                })}
            </NavDropdown>
            <Nav.Link href="/samples" id={SamplesPath}>
              Samples
            </Nav.Link>
            <Nav.Link href="/reviews" id={ReviewsPath}>
              Reviews
            </Nav.Link>
            <Nav.Link href="/contact" id={ContactPath}>
              Contact Us
            </Nav.Link>
            <Nav.Link href="/blog" id={BlogPath}>
              Our Blog
            </Nav.Link>
          </Nav>
          <Button
            variant="outline-success"
            style={{
              color: "#fff",
              border: "none",
              padding: "12px 40px 12px 40px",
              backgroundColor: "#EF2B4B",
              borderRadius: "94px",
            }}
            onClick={onOpen}
          >
            Check Orders
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
