import { FC, Fragment, useEffect, useState } from "react";

import { connect } from "react-redux";
import { ThemeChanger } from "../../common/redux/Action";
import ALLImages from "../../common/ImageData";
import { Helmet } from "react-helmet";
import store from "../../common/redux/Store";
import Sidenav from "./sidenav";
import { Link } from "react-router-dom";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Landingswitcher from "../../layouts/Component/Landingswitcher/Landingswitcher";

interface ComponentProps {}

const Landingpage: FC<ComponentProps> = ({ ThemeChanger }: any) => {
  const [isRTL, _setIsRTL] = useState(false);

  const Topup = () => {
    if (window.scrollY > 30 && document.querySelector(".landing-page")) {
      const Scolls = document.querySelectorAll(".sticky");
      Scolls.forEach((e) => {
        e.classList.add("sticky-pin");
      });
    } else {
      const Scolls = document.querySelectorAll(".sticky");
      Scolls.forEach((e) => {
        e.classList.remove("sticky-pin");
      });
    }
  };
  window.addEventListener("scroll", Topup);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 992) {
        const theme = store.getState();
        ThemeChanger({ ...theme, toggled: "", dataNavLayout: "horizontal" });
      } else {
        const theme = store.getState();
        ThemeChanger({
          ...theme,
          toggled: "close",
          dataNavLayout: "horizontal",
        });
      }
    }

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);
    // handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleNavigation() {
    if (window.innerWidth <= 992) {
      const theme = store.getState();
      ThemeChanger({ ...theme, toggled: "open", dataNavLayout: "horizontal" });
    }
  }

  function handleClick(id: string) {
    const theme = store.getState();

    if (
      [
        "home",
        "features",
        "about",
        "pricing",
        "hilight",
        "clients",
        "faqs",
        "contact",
      ].includes(id)
    ) {
      ThemeChanger({ ...theme, toggled: "close", dataNavLayout: "horizontal" });
    }
  }

  const [showSwitcher, setShowSwitcher] = useState(false);

  const handleSwitcherClick = () => {
    setShowSwitcher(true);
  };

  const [activeTab, setActiveTab] = useState("monthly");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "monthly" ? "yearly" : "monthly"));
  };
  const [bodyclassRender, setBodyclassRender] = useState<number | string>(0);

  useEffect(() => {
    document.body.className = "landing-page-body";
    setBodyclassRender((prev) => (prev as number) + 1);

    return () => {
      setBodyclassRender((prev) => (prev as number) + 1);
    };
  }, []);
  return (
    <Fragment key={bodyclassRender}>
      <Helmet>
        <body className="landing-page"></body>
      </Helmet>
      <div className="page">
        <div className="page-main">
          <div className="app-header hor-header header">
            <div className="container main-container main-header-container">
              <div className="header-content-left">
                <div className="header-element">
                  <div className="horizontal-logo">
                    <Link
                      to={`${import.meta.env.BASE_URL}Dashboard/IndexPage/`}
                      className="header-logo"
                    >
                      <img
                        src={ALLImages("logo5")}
                        alt="logo"
                        className="toggle-logo"
                      />
                      <img
                        src={ALLImages("logo4")}
                        alt="logo"
                        className="toggle-dark"
                      />
                    </Link>
                  </div>
                </div>
                <div className="header-element">
                  <Link
                    to="#"
                    className="sidemenu-toggle header-link"
                    data-bs-toggle="sidebar"
                    onClick={toggleNavigation}
                  >
                    <span className="open-toggle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-link-icon"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
                        <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z" />
                      </svg>
                    </span>
                    <span className="close-toggle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-link-icon"
                        viewBox="0 0 24 24"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="header-content-left">
                <div className="d-flex order-lg-2 header-right-icons">
                  <div className="header-nav-right p-3 d-flex">
                    <Link
                      to={`${import.meta.env.BASE_URL}Firebase/Firebasesignup/`}
                      className="btn ripple btn-min w-sm btn-outline-primary me-2 my-auto d-lg-flex d-none"
                      target="_blank"
                    >
                      New User{" "}
                    </Link>
                    <Link
                      to={`${import.meta.env.BASE_URL}Firebase/Firebasesignin/`}
                      className="btn ripple btn-min w-sm btn-primary me-2 my-auto d-lg-flex d-none"
                      target="_blank"
                    >
                      Login{" "}
                    </Link>
                    <Link
                      to="#"
                      className="header-link switcher-icon p-2"
                      onClick={handleSwitcherClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        className="header-link-icon fa-spin"
                        viewBox="0 0 24 24"
                      >
                        <rect fill="none" height="24" width="24" />
                        <path d="M2.88,7.88l1.54,1.54C4.15,10.23,4,11.1,4,12c0,4.41,3.59,8,8,8s8-3.59,8-8s-3.59-8-8-8c-0.9,0-1.77,0.15-2.58,0.42 L7.89,2.89C9.15,2.32,10.54,2,12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12C2,10.53,2.32,9.14,2.88,7.88z M7,5.5 C7,6.33,6.33,7,5.5,7S4,6.33,4,5.5S4.67,4,5.5,4S7,4.67,7,5.5z" />
                      </svg>
                    </Link>
                    <Landingswitcher
                      show={showSwitcher}
                      onClose={() => setShowSwitcher(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="top sticky">
            <aside className="app-sidebar sticky" id="sidebar">
              <div className="container p-0">
                <div className="main-sidebar">
                  <nav className="main-menu-container nav nav-pills sub-open align-items-center">
                    <div className="landing-logo-container">
                      <div className="horizontal-logo">
                        <Link
                          to={`${import.meta.env.BASE_URL}Dashboard/IndexPage/`}
                          className="header-logo"
                        >
                          <img
                            src={ALLImages("logo2")}
                            alt="logo"
                            className="desktop-logo"
                          />
                          <img
                            src={ALLImages("logo1")}
                            alt="logo"
                            className="desktop-white"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="slide-left d-none" id="slide-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#7b8191"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>{" "}
                      </svg>
                    </div>
                    <Sidenav />
                    <div className="slide-right d-none" id="slide-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#7b8191"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>{" "}
                      </svg>
                    </div>
                    <div className="d-lg-flex d-none">
                      <Link
                        to={`${
                          import.meta.env.BASE_URL
                        }Firebase/Firebasesignin/`}
                        className="btn ripple btn-min w-sm btn-primary me-2 my-auto d-lg-none d-xl-block d-block"
                        target="_blank"
                      >
                        Login{" "}
                      </Link>
                      <button
                        className="demo-icon nav-link icon"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#switcher-canvas"
                        onClick={handleSwitcherClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          className="header-link-icon fa-spin"
                          viewBox="0 0 24 24"
                        >
                          <rect fill="none" height="24" width="24" />
                          <path d="M2.88,7.88l1.54,1.54C4.15,10.23,4,11.1,4,12c0,4.41,3.59,8,8,8s8-3.59,8-8s-3.59-8-8-8c-0.9,0-1.77,0.15-2.58,0.42 L7.89,2.89C9.15,2.32,10.54,2,12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12C2,10.53,2.32,9.14,2.88,7.88z M7,5.5 C7,6.33,6.33,7,5.5,7S4,6.33,4,5.5S4.67,4,5.5,4S7,4.67,7,5.5z" />
                        </svg>
                      </button>
                      <Landingswitcher
                        show={showSwitcher}
                        onClose={() => setShowSwitcher(false)}
                      />
                    </div>
                  </nav>
                </div>
              </div>
            </aside>
          </div>
          <div
            className="main-demo main-demo-1 overflow-hidden landing-top-header"
            id="home"
            onClick={() => handleClick("home")}
          >
            <Container className="px-sm-0">
              <Row className="justify-content-center">
                <Col
                  xl={8}
                  lg={6}
                  className="text-center my-auto animation-zidex pos-relative landing-main-heading"
                >
                  <h1 className="text- fw-bold tx-fixed-white mt-5">
                    A quick and easy way to build your Business with{" "}
                    <span className="text-primary">"Vexel"</span>
                  </h1>
                  <p className="pb-3 fs-15 mt-3 tx-fixed-white op-6">
                    Vexel - Elevate your dashboard design with the Vexel- React
                    Admin template, ensuring a professional and visually
                    striking interface. Unlike the traditional approach of
                    starting from scratch with React, SCSS, CSS, and TS, Vexel-
                    React Admin streamlines the process, eliminating the need
                    for extensive coding. Impress your target audience with
                    effortlessly crafted, well-structured dashboards that adhere
                    to professional standards.
                  </p>
                  <Link
                    to="https://react.spruko.com/vexel-ts/preview/"
                    target="_blank"
                    className="btn btn-lg ripple btn-min w-lg mb-3 me-2 btn-primary"
                  >
                    <i className="fe fe-play me-2"></i> Get Started{" "}
                  </Link>
                  <Link
                    to="https://themeforest.net/user/spruko/portfolio"
                    className="btn btn-lg ripple btn-min w-lg btn-light mb-3 me-2"
                    target="_blank"
                  >
                    <i className="fe fe-eye me-2 d-inline-flex"></i>Discover
                    More{" "}
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="main-content mt-0">
            <div className="main-content app-content">
              <div className="main-container">
                <div className="">
                  <div
                    className="sptb section features bg-white"
                    id="features"
                    onClick={() => handleClick("features")}
                  >
                    <Container>
                      <Row>
                        <h4 className="text-center fw-bold">FEATURES</h4>
                        <span className="landing-title"></span>
                        <h6 className="text-center fw-semibold mb-5">
                          The Vexel React admin template features that are
                          completely easy-to-use for any user, even for a
                          beginner.
                        </h6>
                        <Col lg={4} md={6} sm={12}>
                          <Card className="rounded-3 tx-fixed-white bg-primary">
                            <Card.Body>
                              <div className="d-flex">
                                <div className="mb-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="#fff"
                                    id="code"
                                  >
                                    <path
                                      d="M2.5 3a.5.5 0 0 0-.5.5v22a.5.5 0 0 0 .5.5h4.25v-1H3V8h24v10.236c.01.048.034.09.04.139.277-.227.62-.34.96-.348V3.5a.5.5 0 0 0-.5-.5h-25zM3 4h24v3H3V4zm1.5 1a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm2 0a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm2 0a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5zm9.02 5a.5.5 0 0 0-.047.002.5.5 0 0 0-.4.24L12.08 18.23a.5.5 0 1 0 .848.53l4.992-7.989a.5.5 0 0 0-.4-.771zm-7.036 1a.5.5 0 0 0-.343.152l-2.963 2.965a.5.5 0 0 0-.102.12.5.5 0 0 0-.02.033.5.5 0 0 0-.001.001.5.5 0 0 0-.006.014.5.5 0 0 0-.012.024.5.5 0 0 0-.01.027.5.5 0 0 0-.007.023.5.5 0 0 0-.006.022.5.5 0 0 0-.004.02.5.5 0 0 0-.002.013.5.5 0 0 0 .178.479l2.955 2.957a.5.5 0 1 0 .707-.707L8.207 14.5l2.64-2.64a.5.5 0 0 0-.363-.86zm9.016 0a.5.5 0 0 0-.348.86l2.641 2.64-2.64 2.643a.5.5 0 1 0 .706.707l2.961-2.963a.5.5 0 0 0 .028-.744l-.002-.002-2.987-2.989A.5.5 0 0 0 19.5 11zm3.908 7a.5.5 0 0 0-.5.5v.895c-.31.096-.608.217-.896.367l-.63-.627a.5.5 0 0 0-.706 0l-1.543 1.54a.5.5 0 0 0 0 .708l.63.63c-.15.289-.276.587-.372.897H18.5a.5.5 0 0 0-.5.5v2.182a.5.5 0 0 0 .5.5h.893c.096.31.218.61.369.898l-.63.63a.5.5 0 0 0 0 .706l1.544 1.541a.5.5 0 0 0 .707 0l.63-.629c.288.15.586.273.895.37v.892a.5.5 0 0 0 .5.5h2.184a.5.5 0 0 0 .5-.5v-.893c.31-.096.608-.217.896-.367l.63.627a.5.5 0 0 0 .706 0l1.543-1.54a.5.5 0 0 0 0-.708l-.63-.63c.15-.289.276-.587.372-.897h.891a.5.5 0 0 0 .5-.5V23.41a.5.5 0 0 0-.5-.5h-.893a5.384 5.384 0 0 0-.369-.898l.63-.63a.5.5 0 0 0 0-.706l-1.544-1.541a.5.5 0 0 0-.707 0l-.63.629a5.373 5.373 0 0 0-.895-.37V18.5a.5.5 0 0 0-.5-.5h-2.184zm.5 1h1.184v.719a.5.5 0 0 0 .388.488c.484.11.944.301 1.364.564a.5.5 0 0 0 .619-.07l.508-.506.836.834-.506.506a.5.5 0 0 0-.07.617c.262.421.451.884.56 1.368a.5.5 0 0 0 .488.39H30v1.182h-.719a.5.5 0 0 0-.488.388c-.11.484-.3.946-.564 1.366a.5.5 0 0 0 .07.619l.508.508-.836.834-.506-.504a.5.5 0 0 0-.617-.07c-.421.262-.884.451-1.368.56a.5.5 0 0 0-.388.486V30h-1.184v-.719a.5.5 0 0 0-.388-.486 4.4 4.4 0 0 1-1.364-.565.5.5 0 0 0-.619.07l-.508.507-.836-.834.506-.506a.5.5 0 0 0 .07-.62 4.403 4.403 0 0 1-.56-1.365.5.5 0 0 0-.488-.39H19V23.91h.719a.5.5 0 0 0 .488-.389c.11-.483.301-.945.564-1.365a.5.5 0 0 0-.07-.619l-.508-.508.836-.834.506.504a.5.5 0 0 0 .617.07c.421-.262.884-.453 1.368-.562a.5.5 0 0 0 .388-.484V19zm-12.283 1.73a.5.5 0 0 0-.5.5v.512c-.144.05-.285.106-.422.172l-.361-.36a.5.5 0 0 0-.707 0l-1.06 1.061a.5.5 0 0 0 0 .707l.36.362a3.853 3.853 0 0 0-.175.421h-.51a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 .5.5h.512c.05.145.105.285.172.422l-.36.362a.5.5 0 0 0 0 .707l1.06 1.06a.5.5 0 0 0 .708 0l.361-.361c.138.067.278.124.422.174v.511a.5.5 0 0 0 .5.5h1.5a.5.5 0 0 0 .5-.5v-.511a3.95 3.95 0 0 0 .422-.174l.361.361a.5.5 0 0 0 .707 0l1.06-1.06a.5.5 0 0 0 0-.71l-.359-.359c.067-.137.124-.277.174-.422h.51a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 0-.5-.5h-.512a3.855 3.855 0 0 0-.174-.421l.362-.362a.5.5 0 0 0 0-.707l-1.06-1.06a.5.5 0 0 0-.708 0l-.361.361a3.797 3.797 0 0 0-.422-.176v-.51a.5.5 0 0 0-.5-.5h-1.5zm.5 1h.5v.338a.5.5 0 0 0 .389.487c.315.072.617.197.89.369a.5.5 0 0 0 .62-.07l.238-.239.353.354-.238.236a.5.5 0 0 0-.07.62c.17.274.296.574.367.89a.5.5 0 0 0 .486.39H16v.5h-.338a.5.5 0 0 0-.488.39 2.867 2.867 0 0 1-.367.888.5.5 0 0 0 .07.62l.238.24-.353.35-.237-.236a.5.5 0 0 0-.619-.07 2.872 2.872 0 0 1-.89.365.5.5 0 0 0-.391.489v.34h-.5v-.338a.5.5 0 0 0-.389-.489 2.881 2.881 0 0 1-.89-.367.5.5 0 0 0-.62.068l-.238.239-.353-.354.238-.238a.5.5 0 0 0 .07-.617 2.876 2.876 0 0 1-.367-.89.5.5 0 0 0-.486-.391h-.34v-.5h.338a.5.5 0 0 0 .488-.39c.072-.314.196-.616.367-.89a.5.5 0 0 0-.07-.619l-.238-.238.353-.354.237.237a.5.5 0 0 0 .619.07c.274-.171.575-.294.89-.365a.5.5 0 0 0 .391-.487v-.338zm12.375.272A2.51 2.51 0 0 0 22 24.5a2.51 2.51 0 0 0 2.5 2.5 2.51 2.51 0 0 0 2.5-2.5 2.51 2.51 0 0 0-2.5-2.498zm0 1c.826 0 1.5.672 1.5 1.498s-.674 1.5-1.5 1.5-1.5-.674-1.5-1.5.674-1.498 1.5-1.498zm-12.125.707c-.903 0-1.646.743-1.646 1.646 0 .904.743 1.645 1.646 1.645.903 0 1.646-.742 1.646-1.645s-.743-1.646-1.646-1.646zm0 1a.645.645 0 1 1 0 1.291.645.645 0 1 1 0-1.291z"
                                      color="#000"
                                    ></path>
                                  </svg>
                                </div>
                                <div className="ms-3">
                                  <h5 className="fw-bold">
                                    Quality &amp; Clean Code
                                  </h5>
                                  <p className="mb-0">
                                    The Vexel React Bootstrap admin code is
                                    maintained very cleanly and well-structured
                                    with proper comments and w3 validations.
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Card className="rounded-3 tx-fixed-white bg-primary">
                            <Card.Body>
                              <div className="d-flex">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="32"
                                    width="32"
                                    fill="#fff"
                                    data-name="Layer 1"
                                    viewBox="0 0 128 128"
                                    id="demonstrates"
                                  >
                                    <path d="M109 54H49a2 2 0 0 0 0 4h60a2 2 0 0 0 0-4zm0-8H49a2 2 0 0 0 0 4h60a2 2 0 0 0 0-4zm0-8H79.727a12.059 12.059 0 0 1-4.945 4H109a2 2 0 0 0 0-4zm-13-4a4.004 4.004 0 0 0 4-4v-6a4.004 4.004 0 0 0-4-4H74.782a12.059 12.059 0 0 1 4.945 4H96l.003 6H81.949c.028.33.051.662.051 1a11.941 11.941 0 0 1-.395 3z"></path>
                                    <path d="M126 64h-4V17.95c-.33.03-.662.05-1 .05h-3v46H46v4h22.95l-2.683 6.17a16.843 16.843 0 0 1 3.921 1.013L73.311 68H84.69l4.357 10.02a17.037 17.037 0 0 1 3.394-2.224L89.05 68H126a2 2 0 0 0 0-4zM12 84h.526a17.027 17.027 0 0 1 2.536-4H10v-3.18A11.982 11.982 0 0 1 8 77a11.982 11.982 0 0 1-2-.18V82a2 2 0 0 0 2 2v14.724l4-.737v-1.298a16.683 16.683 0 0 1 0-11.378zM38.456 4H121a3 3 0 0 1 0 6H41.036a17.947 17.947 0 0 1 .464 4H121a7 7 0 0 0 0-14H37a6.966 6.966 0 0 0-1.89.267A18.141 18.141 0 0 1 38.455 4z"></path>
                                    <path d="M42 39h28a8 8 0 0 0 0-16H39.064a18.097 18.097 0 0 1-3.148 4H70a4 4 0 0 1 0 8H40a2 2 0 0 0-2 2v40.283a17.125 17.125 0 0 1 4 4.095zM8 73a8.01 8.01 0 0 0 8-8V45.663a2 2 0 0 0-4 0V65a4 4 0 0 1-8 0V31.199C4 28.883 6.333 27 9.2 27h1.884a18.096 18.096 0 0 1-3.1-3.92C3.485 23.613 0 27.046 0 31.2V65a8.01 8.01 0 0 0 8 8zm15.5-45a14 14 0 1 0-14-14 14.016 14.016 0 0 0 14 14zm0-24a10 10 0 1 1-10 10 10.011 10.011 0 0 1 10-10zM100 104a13 13 0 1 0-13-13 13.015 13.015 0 0 0 13 13zm0-22a9 9 0 1 1-9 9 9.01 9.01 0 0 1 9-9zm-72 22a13 13 0 1 0-13-13 13.015 13.015 0 0 0 13 13zm0-22a9 9 0 1 1-9 9 9.01 9.01 0 0 1 9-9zM4.052 124l2.957-15.752c.008-.044.014-.087.02-.131a1.596 1.596 0 0 1 1.394-1.336l9.898-1.824a17.123 17.123 0 0 1-3.621-3.4l-6.951 1.281a5.59 5.59 0 0 0-4.683 4.729L.041 123.694A3.754 3.754 0 0 0 3.749 128h29.225a7.75 7.75 0 0 1-.967-4zm120.882-16.433a5.573 5.573 0 0 0-4.632-4.72l-7.002-1.29a17.127 17.127 0 0 1-3.62 3.4l9.948 1.833a1.575 1.575 0 0 1 1.344 1.327c.005.044.011.087.02.13L123.95 124H95.993a7.75 7.75 0 0 1-.967 4h29.225a3.743 3.743 0 0 0 2.834-1.298 3.799 3.799 0 0 0 .861-3.086zm-36 0a5.573 5.573 0 0 0-4.632-4.72l-7.002-1.29a17.127 17.127 0 0 1-3.62 3.4l9.948 1.833a1.575 1.575 0 0 1 1.344 1.327c.005.044.011.087.02.13L87.95 124H40.052l2.957-15.752c.008-.044.014-.087.02-.131a1.596 1.596 0 0 1 1.394-1.336l9.898-1.824a17.123 17.123 0 0 1-3.621-3.4l-6.951 1.281a5.59 5.59 0 0 0-4.683 4.729l-3.025 16.127A3.754 3.754 0 0 0 39.749 128h48.502a3.743 3.743 0 0 0 2.834-1.298 3.799 3.799 0 0 0 .861-3.086z"></path>
                                    <path d="M64 104a13 13 0 1 0-13-13 13.015 13.015 0 0 0 13 13Zm0-22a9 9 0 1 1-9 9 9.01 9.01 0 0 1 9-9Z"></path>
                                  </svg>
                                </div>
                                <div className="ms-3">
                                  <h5 className="fw-bold">Multiple Demos</h5>
                                  <p className="mb-0">
                                    {" "}
                                    We included multiple demos, preview video,
                                    and screen shots to give a quick overview of
                                    our Vexel react admin template.{" "}
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Card className="rounded-3 tx-fixed-white bg-primary">
                            <Card.Body>
                              <div className="d-flex">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="32"
                                    width="32"
                                    fill="#fff"
                                    viewBox="0 0 512 512"
                                    id="validation"
                                  >
                                    <path d="M82.931 198.457a8 8 0 0 1 8-8h202.057a8 8 0 0 1 0 16H90.931a8 8 0 0 1-8-8zm210.056 170.639H90.931a8 8 0 0 0 0 16h202.057a8 8 0 1 0-.001-16zm0 59.547H90.931a8 8 0 0 0 0 16h202.057a8 8 0 1 0-.001-16zM90.931 146.91h145.046a8 8 0 0 0 0-16H90.931a8 8 0 0 0 0 16zm333.25 239.239v64.324a8 8 0 0 1-8 8h-45.527V504a8 8 0 0 1-8 8H21.263a8 8 0 0 1-8-8V61.527a8 8 0 0 1 8-8H66.79V8a8 8 0 0 1 8-8h286.079a8 8 0 0 1 5.657 2.343l55.312 55.312a8 8 0 0 1 2.343 5.657v117.451c43.231 14.114 74.556 54.811 74.556 102.693s-31.325 88.579-74.556 102.693zM368.869 55.312h27.998l-27.998-27.998v27.998zM82.791 53.527h224.552A8 8 0 0 1 313 55.87l55.312 55.312a8 8 0 0 1 2.343 5.657v60.497a108.155 108.155 0 0 1 37.527-.464V71.312H360.87a8 8 0 0 1-8-8V16H82.791v37.527zm232.551 55.311h27.998L315.342 80.84v27.998zM354.654 496V385.25c-28.541-10.147-51.595-31.97-63.375-59.7H90.931a8 8 0 0 1 0-16h195a107.85 107.85 0 0 1-3.194-26.094c0-5.941.49-11.769 1.417-17.453H90.931a8 8 0 0 1 0-16h197.116c10.387-31.807 35.164-57.163 66.608-68.341v-56.824h-47.312a8 8 0 0 1-8-8V69.527H29.263V496h325.391zm53.527-105.96a108.244 108.244 0 0 1-37.527-.464v52.897h37.527V390.04zm74.556-106.584c0-50.729-41.271-92-92-92s-92 41.271-92 92 41.271 92 92 92 92-41.271 92-92zm-27.348-19.376c-7.672 7.749-15.345 15.531-23.02 23.314-13.867 14.064-28.207 28.608-42.404 42.806-3.667 3.667-8.543 5.687-13.729 5.687s-10.062-2.02-13.729-5.687l-36.374-36.374c-7.571-7.57-7.571-19.889 0-27.459a19.29 19.29 0 0 1 13.729-5.687 19.29 19.29 0 0 1 13.73 5.687l22.598 22.598 51.697-52.212c3.663-3.684 8.525-5.713 13.703-5.728h.056a19.255 19.255 0 0 1 13.667 5.639c7.578 7.538 7.612 19.836.076 27.416zm-11.359-16.07a3.388 3.388 0 0 0-4.787.014l-57.342 57.913a8.001 8.001 0 0 1-5.665 2.371h-.02a8.002 8.002 0 0 1-5.657-2.343l-28.283-28.283a3.4 3.4 0 0 0-2.416-1c-.528 0-1.545.13-2.416 1s-1 1.888-1 2.416.13 1.545 1 2.416l36.374 36.374a3.42 3.42 0 0 0 4.832 0c14.158-14.158 28.477-28.681 42.325-42.726 7.682-7.792 15.362-15.582 23.055-23.351a3.393 3.393 0 0 0 0-4.801z"></path>
                                  </svg>
                                </div>
                                <div className="ms-3">
                                  <h5 className="fw-bold">Validation Forms</h5>
                                  <p className="mb-0">
                                    {" "}
                                    Different types of “Form Validation” are
                                    implemented in this Vexel react bootstrap
                                    admin template and used strict validation
                                    rules.{" "}
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Card className="rounded-3 tx-fixed-white bg-primary">
                            <Card.Body>
                              <div className="d-flex">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="32"
                                    width="32"
                                    fill="#fff"
                                    viewBox="0 0 60 60"
                                    id="menu-management"
                                  >
                                    <path d="M18 19a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm24-4H26a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4H26a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm-24 4a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm24-4H26a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4H26a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm-24 4a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm24-4H26a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4H26a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"></path>
                                    <path d="M30 8a22 22 0 1 0 22 22A22.025 22.025 0 0 0 30 8Zm0 42a20 20 0 1 1 20-20 20.023 20.023 0 0 1-20 20Z"></path>
                                    <path d="m58.2 25.191-2.888-1.154a25.729 25.729 0 0 0-3.2-7.711l1.224-2.864a2.639 2.639 0 0 0-.384-2.769 30.7 30.7 0 0 0-1.743-1.916 29.847 29.847 0 0 0-1.885-1.714 2.646 2.646 0 0 0-2.783-.4L43.674 7.89a25.782 25.782 0 0 0-7.711-3.2L34.808 1.8A2.706 2.706 0 0 0 32.585.115C31.811.038 30.965 0 30 0s-1.811.038-2.573.114A2.711 2.711 0 0 0 25.19 1.8l-1.153 2.891a25.782 25.782 0 0 0-7.711 3.2l-2.863-1.223a2.641 2.641 0 0 0-2.772.383 31.117 31.117 0 0 0-1.913 1.743c-.7.716-1.249 1.32-1.715 1.884a2.647 2.647 0 0 0-.4 2.784l1.224 2.864a25.729 25.729 0 0 0-3.2 7.711L1.8 25.192a2.7 2.7 0 0 0-1.685 2.223C.038 28.189 0 29.035 0 30s.038 1.811.114 2.574A2.712 2.712 0 0 0 1.8 34.81l2.888 1.153a25.729 25.729 0 0 0 3.2 7.711l-1.221 2.863a2.64 2.64 0 0 0 .385 2.771c.476.577 1.025 1.18 1.742 1.914.718.7 1.321 1.25 1.884 1.715a2.647 2.647 0 0 0 2.784.4l2.864-1.224a25.729 25.729 0 0 0 7.711 3.2l1.155 2.887a2.706 2.706 0 0 0 2.223 1.683c.774.077 1.62.115 2.585.115s1.811-.038 2.574-.114A2.712 2.712 0 0 0 34.81 58.2l1.153-2.888a25.729 25.729 0 0 0 7.711-3.2l2.863 1.224a2.641 2.641 0 0 0 2.771-.385 30.585 30.585 0 0 0 1.914-1.742c.7-.718 1.25-1.321 1.715-1.884a2.647 2.647 0 0 0 .4-2.784l-1.224-2.864a25.729 25.729 0 0 0 3.2-7.711l2.887-1.158a2.706 2.706 0 0 0 1.683-2.223c.077-.774.115-1.62.115-2.585s-.038-1.808-.115-2.582a2.707 2.707 0 0 0-1.683-2.227Zm-.3 7.205a.7.7 0 0 1-.439.556L54.077 34.3a1 1 0 0 0-.607.72 23.8 23.8 0 0 1-3.325 8.018 1 1 0 0 0-.082.937l1.43 3.348a.665.665 0 0 1-.086.71 27.78 27.78 0 0 1-1.6 1.758 29.216 29.216 0 0 1-1.788 1.627.662.662 0 0 1-.7.074l-3.347-1.43a1.006 1.006 0 0 0-.937.082 23.8 23.8 0 0 1-8.018 3.325 1 1 0 0 0-.72.607l-1.343 3.374a.7.7 0 0 1-.568.445c-.707.071-1.489.1-2.386.1a23.943 23.943 0 0 1-2.4-.106.7.7 0 0 1-.556-.439L25.7 54.077a1 1 0 0 0-.72-.607 23.8 23.8 0 0 1-8.018-3.325 1 1 0 0 0-.544-.162 1.015 1.015 0 0 0-.393.08l-3.348 1.43a.666.666 0 0 1-.71-.086 27.78 27.78 0 0 1-1.758-1.6 29.216 29.216 0 0 1-1.627-1.788.662.662 0 0 1-.074-.7l1.43-3.347a1 1 0 0 0-.082-.937 23.8 23.8 0 0 1-3.326-8.014 1 1 0 0 0-.607-.72L2.55 32.954a.7.7 0 0 1-.445-.568A23.562 23.562 0 0 1 2 30a23.62 23.62 0 0 1 .106-2.4.7.7 0 0 1 .439-.556L5.923 25.7a1 1 0 0 0 .607-.721 23.784 23.784 0 0 1 3.325-8.016 1 1 0 0 0 .082-.937l-1.43-3.349a.664.664 0 0 1 .087-.71c.441-.535.955-1.1 1.6-1.758a29.056 29.056 0 0 1 1.787-1.627.662.662 0 0 1 .7-.074l3.348 1.429a1 1 0 0 0 .937-.081 23.776 23.776 0 0 1 8.013-3.326 1 1 0 0 0 .72-.607l1.347-3.373a.7.7 0 0 1 .568-.445C28.321 2.035 29.1 2 30 2s1.679.035 2.4.106a.7.7 0 0 1 .555.438L34.3 5.923a1 1 0 0 0 .72.607 23.776 23.776 0 0 1 8.017 3.325 1 1 0 0 0 .937.081l3.349-1.43a.665.665 0 0 1 .709.086c.537.444 1.1.957 1.759 1.6.659.676 1.173 1.24 1.627 1.79a.66.66 0 0 1 .074.7l-1.43 3.348a1 1 0 0 0 .082.937 23.784 23.784 0 0 1 3.325 8.016 1 1 0 0 0 .607.721l3.374 1.348a.7.7 0 0 1 .443.557v.01A23.589 23.589 0 0 1 58 30a23.593 23.593 0 0 1-.106 2.4Z"></path>
                                  </svg>
                                </div>
                                <div className="ms-3">
                                  <h5 className="fw-bold">Widgets</h5>
                                  <p className="mb-0">
                                    {" "}
                                    30+ widgets are included in this react
                                    bootstrap template. Please check out the
                                    best that suits you, implement it in your
                                    projects.{" "}
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Card className="rounded-3 tx-fixed-white bg-primary">
                            <Card.Body>
                              <div className="d-flex">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="32"
                                    width="32"
                                    fill="#fff"
                                    viewBox="0 0 60 60"
                                    id="charts"
                                  >
                                    <path d="M22.472,17.521a3.532,3.532,0,0,0-4.951,0L.719,34.338A2.391,2.391,0,0,0,0,36.045a2.42,2.42,0,0,0,.713,1.732l1.511,1.511A2.418,2.418,0,0,0,3.943,40h.011a2.387,2.387,0,0,0,1.7-.713L20,24.955l7.526,7.526a3.532,3.532,0,0,0,4.951,0l22.5-22.5.3.3a2.449,2.449,0,0,0,2.593.572,2.485,2.485,0,0,0,1.642-2.139l.48-6.04V2.659A2.5,2.5,0,0,0,57.327.006L51.279.487a2.48,2.48,0,0,0-2.13,1.641A2.447,2.447,0,0,0,49.72,4.72l.3.3L30,25.047ZM52.145,5.73a1,1,0,0,0,0-1.414l-1.011-1.01a.451.451,0,0,1-.1-.494.487.487,0,0,1,.417-.332L57.473,2a.494.494,0,0,1,.381.145A.481.481,0,0,1,58,2.521l-.479,6.024a.492.492,0,0,1-.333.426.455.455,0,0,1-.5-.106l-1.009-1.01a1,1,0,0,0-1.414,0L31.065,31.06a1.517,1.517,0,0,1-2.129,0l-8.23-8.229a1,1,0,0,0-1.414,0L4.237,37.879A.413.413,0,0,1,3.945,38h0a.432.432,0,0,1-.306-.127L2.128,36.364A.434.434,0,0,1,2,36.055a.419.419,0,0,1,.127-.3L18.932,18.942a1.521,1.521,0,0,1,2.13,0l8.229,8.23a1,1,0,0,0,1.414,0Z"></path>
                                    <path d="M58,54.184V29a3,3,0,0,0-3-3H45a3,3,0,0,0-3,3V54H38V39a3,3,0,0,0-3-3H25a3,3,0,0,0-3,3V54H18V45a3,3,0,0,0-3-3H5a3,3,0,0,0-3,3v9.184A2.993,2.993,0,0,0,3,60H57a2.993,2.993,0,0,0,1-5.816ZM44,29a1,1,0,0,1,1-1H55a1,1,0,0,1,1,1V54H44ZM24,39a1,1,0,0,1,1-1H35a1,1,0,0,1,1,1V54H24ZM5,44H15a1,1,0,0,1,1,1v9H4V45A1,1,0,0,1,5,44ZM57,58H3a1,1,0,0,1,0-2H57a1,1,0,0,1,0,2Z"></path>
                                  </svg>
                                </div>
                                <div className="ms-3">
                                  <h5 className="fw-bold">3 Types of Charts</h5>
                                  <p className="mb-0">
                                    {" "}
                                    We included three (3) types of the best
                                    possible react integrated chart options for
                                    your project. You can use with your
                                    requirement.{" "}
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                          <Card className="rounded-3 tx-fixed-white bg-primary">
                            <Card.Body>
                              <div className="d-flex">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="32"
                                    width="32"
                                    fill="#fff"
                                    viewBox="0 0 68 68"
                                    id="project-documentation"
                                  >
                                    <path d="M35.592 37.689H9.108a.995.995 0 1 0 0 1.99h26.484a.995.995 0 1 0 0-1.99zm0 9.37H9.108a.995.995 0 1 0 0 1.99h26.484a.995.995 0 1 0 0-1.99zm0-28.108H9.108a.995.995 0 1 0 0 1.99h26.484a.995.995 0 1 0 0-1.99zm0 9.369H9.108a.995.995 0 1 0 0 1.99h26.484a.995.995 0 1 0 0-1.99zm0 28.108H9.108a.995.995 0 1 0 0 1.99h26.484a.995.995 0 1 0 0-1.99z"></path>
                                    <path d="m60.55 51.647-3.444-.587 2.02-2.847A.951.951 0 0 0 59.018 47l-2.23-2.23a.938.938 0 0 0-1.214-.1l-2.846 2.011-.587-3.434a.94.94 0 0 0-.926-.786h-.587V13.556c0-.214-.104-.51-.319-.726 0 0 0-.01-.01-.01L38.902 2.409a1.107 1.107 0 0 0-.667-.259H6.763a3.666 3.666 0 0 0-3.662 3.663v56.374a3.666 3.666 0 0 0 3.662 3.663h44.45a.94.94 0 0 0 .927-.776l.587-3.444 2.846 2.02a.951.951 0 0 0 1.215-.11l2.23-2.229a.951.951 0 0 0 .109-1.214l-2.02-2.847 3.443-.587a.94.94 0 0 0 .776-.925v-3.166a.94.94 0 0 0-.776-.925zM6.763 63.859a1.67 1.67 0 0 1-1.672-1.672V5.813A1.67 1.67 0 0 1 6.763 4.14H37.24v8.32a2.09 2.09 0 0 0 2.09 2.09h9.306v27.91h-.587a.94.94 0 0 0-.926.785l-.587 3.434-2.847-2.01a.938.938 0 0 0-1.214.1l-2.23 2.229a.938.938 0 0 0-.099 1.214l2.01 2.847-3.433.587a.94.94 0 0 0-.787.925v3.166a.94.94 0 0 0 .787.925l3.434.587-2.011 2.847a.938.938 0 0 0 .1 1.214l2.23 2.23a.951.951 0 0 0 1.213.11l2.847-2.021.378 2.23H6.764zm42.868-4.916a4.783 4.783 0 0 1-4.787-4.788 4.783 4.783 0 0 1 4.787-4.787 4.783 4.783 0 0 1 4.788 4.787 4.783 4.783 0 0 1-4.788 4.788z"></path>
                                    <path d="M63.904 2.31h-9.286a.992.992 0 0 0-.995.994V31.9c0 .01 0 .02.01.03 0 .11.02.209.06.308.01.03.01.05.03.08 0 .01.01.03.01.04l4.707 8.967c.17.329.508.528.886.528s.716-.21.886-.537l4.578-8.968c.01-.01.01-.02.01-.04a.798.798 0 0 0 .09-.368c0-.02.01-.03.01-.04V3.304a.992.992 0 0 0-.996-.995zm-.995 28.595h-7.296V8.709h7.296v22.196z"></path>
                                  </svg>
                                </div>
                                <div className="ms-3">
                                  <h5 className="fw-bold">Documentation</h5>
                                  <p className="mb-0">
                                    {" "}
                                    The documentation provides clear-cut
                                    material for the Vexel react admin template.
                                    a way that every user can understand.{" "}
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </div>

                  <div
                    className="section bg-light pb-0"
                    id="about"
                    onClick={() => handleClick("about")}
                  >
                    <Container>
                      <Row>
                        <h4 className="text-center fw-bold">OUR MISSION</h4>
                        <span className="landing-title"></span>
                        <h6 className="text-center fw-semibold mb-2">
                          The Vexel react admin template Our mission is make our
                          work meaningful and greatful.
                        </h6>
                        <Col lg={12}>
                          <Card className="bg-transparent">
                            <Card.Body className="text-dark">
                              <div className="statistics-info">
                                <Row>
                                  <Col xl={6} lg={6} className="pe-0 my-auto">
                                    <div className="ps-5">
                                      <h2 className="text-start fw-semibold fs-20 mb-4">
                                        Our Mission is Bringing ideas to
                                        Reality.
                                      </h2>
                                      <div className="d-flex">
                                        <span>
                                          <span>
                                            <i className="mdi mdi-chevron-double-right fs-24 lh-1 text-primary"></i>
                                          </span>
                                        </span>
                                        <div className="ms-3 mb-3">
                                          <h6 className="fw-bold">
                                            Ultra Flexible & Secure
                                          </h6>
                                          <p className="fs-14">
                                            The Vexel react admin code is
                                            maintained very cleanly and
                                            well-structured with proper
                                            comments.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <span>
                                          <span>
                                            <i className="mdi mdi-chevron-double-right fs-24 lh-1 text-secondary"></i>
                                          </span>
                                        </span>
                                        <div className="ms-3 mb-3">
                                          <h6 className="fw-bold">
                                            It Allows easy customization
                                          </h6>
                                          <p className="fs-14">
                                            The Vexel react admin code is
                                            maintained very cleanly and
                                            well-structured with proper
                                            comments.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <span>
                                          <span>
                                            <i className="mdi mdi-chevron-double-right fs-24 lh-1 text-warning"></i>
                                          </span>
                                        </span>
                                        <div className="ms-3 mb-3">
                                          <h6 className="fw-bold">
                                            Comfortable & Fast Response
                                          </h6>
                                          <p className="fs-14">
                                            {" "}
                                            The Vexel react admin code is
                                            maintained very cleanly and
                                            well-structured with proper
                                            comments.{" "}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xl={6} lg={6} className="ps-0">
                                    <div className="text-center mb-3">
                                      <img
                                        src={ALLImages("Landing1")}
                                        alt=""
                                        className="br-5"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </div>

                  <div
                    className="section highlights bg-white"
                    id="pricing"
                    onClick={() => handleClick("pricing")}
                  >
                    <Container>
                      <Row>
                        <section className="sptb demo-screen-demo">
                          <Container>
                            <h4 className="text-center fw-bold">highlights</h4>
                            <h6 className="text-center fw-semibold mb-5">
                              The Vexel react admin template comes with
                              ready-to-use features and more highlight keys.
                            </h6>
                            <span className="landing-title"></span>
                            <Row className="align-items-center justify-content-center gap-3">
                              <Col xl={5} lg={5}>
                                <Card className="card-left bg-light">
                                  <Card.Body className="p-2">
                                    <div className="highlight-icon">
                                      <i className="bi bi-speedometer2"></i>
                                    </div>
                                    <h6>Comfortable Dashboard Designs</h6>
                                    <p>
                                      Quisque rutrum. Aenean imperdiet. Etiam
                                      ultricies nisi vel augue. Curabitur
                                      ullamcorper ultricies nisi.
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col xl={5} lg={5}>
                                <Card className="card-left bg-light">
                                  <Card.Body className="p-2">
                                    <div className="highlight-icon">
                                      <i className="bi bi-fullscreen-exit"></i>
                                    </div>
                                    <h6>Beautiful view in all screens</h6>
                                    <p>
                                      Quisque rutrum. Aenean imperdiet. Etiam
                                      ultricies nisi vel augue. Curabitur
                                      ullamcorper ultricies nisi.
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col xl={5} lg={5}>
                                <Card className="card-left bg-light">
                                  <Card.Body className="p-2">
                                    <div className="highlight-icon">
                                      <i className="bi bi-shield-lock"></i>
                                    </div>
                                    <h6>Advanced Security Controls</h6>
                                    <p>
                                      Quisque rutrum. Aenean imperdiet. Etiam
                                      ultricies nisi vel augue. Curabitur
                                      ullamcorper ultricies nisi.
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col xl={5} lg={5}>
                                <Card className="card-left bg-light">
                                  <Card.Body className="p-2">
                                    <div className="highlight-icon">
                                      <i className="bi bi-file-code"></i>
                                    </div>
                                    <h6>100+ react Components</h6>
                                    <p>
                                      Quisque rutrum. Aenean imperdiet. Etiam
                                      ultricies nisi vel augue. Curabitur
                                      ullamcorper ultricies nisi.
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col xl={5} lg={5}>
                                <Card className="card-left bg-light">
                                  <Card.Body className="p-2">
                                    <div className="highlight-icon">
                                      <i className="bi bi-chevron-double-right"></i>
                                    </div>
                                    <h6>Easy to use & modifications</h6>
                                    <p>
                                      Quisque rutrum. Aenean imperdiet. Etiam
                                      ultricies nisi vel augue. Curabitur
                                      ullamcorper ultricies nisi.
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                              <Col xl={5} lg={5}>
                                <Card className="card-left bg-light">
                                  <Card.Body className="p-2">
                                    <div className="highlight-icon">
                                      <i className="bi bi-headset"></i>
                                    </div>
                                    <h6>Expertise support system</h6>
                                    <p>
                                      Quisque rutrum. Aenean imperdiet. Etiam
                                      ultricies nisi vel augue. Curabitur
                                      ullamcorper ultricies nisi.
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>
                          </Container>
                        </section>
                      </Row>
                    </Container>
                  </div>

                  <div
                    className="section bg-light"
                    id="hilight"
                    onClick={() => handleClick("hilight")}
                  >
                    <Container>
                      <Row className="pricing-tabs">
                        <h4 className="text-center fw-bold">
                          CHOOSE A PERFECT PLAN{" "}
                        </h4>
                        <span className="landing-title"></span>
                        <h6 className="text-center fw-semibold mb-5">
                          Choose the better and premium plans and get more
                          benefits.
                        </h6>

                        <div className="pri-tabs-heading text-center mb-3">
                          <label
                            className={`toggler ${
                              activeTab === "monthly"
                                ? "toggler--is-active"
                                : ""
                            }`}
                            id="filt-monthly"
                          >
                            Monthly
                          </label>
                          <div className="toggle">
                            <input
                              type="checkbox"
                              id="switcher"
                              className="check"
                              onChange={toggleTab}
                              checked={activeTab === "yearly"}
                            />
                            <b
                              className={`b switch ${
                                activeTab === "yearly" ? "yearly" : ""
                              }`}
                            ></b>
                          </div>
                          <label
                            className={`toggler ${
                              activeTab === "yearly" ? "toggler--is-active" : ""
                            }`}
                            id="filt-yearly"
                          >
                            Yearly
                          </label>
                        </div>
                        <div
                          id="monthly"
                          className={`wrapper-full ${
                            activeTab === "monthly" ? "" : "hide"
                          }`}
                        >
                          <Row className="d-flex align-items-center justify-content-center">
                            <Col sm={12} lg={4}>
                              <Card className="pricing-card">
                                <Card.Header className="d-block text-justified">
                                  <p className="fs-18 fw-semibold mb-1 pe-0">
                                    Basic
                                  </p>
                                  <h4 className="text-justify fw-bold mb-1">
                                    {" "}
                                    <span className="me-2">$</span>
                                    <span className="me-1">39</span>
                                    <span className="fs-20">
                                      <span className="op-0-5 text-20">/</span>{" "}
                                      month
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <p className="fs-13 mb-1">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Iure quos debitis aliquam
                                    .
                                  </p>
                                  <p className="fs-13 mb-1 text-primary">
                                    Billed monthly on regular basis!
                                  </p>
                                  <ul className="pricing-body ps-0">
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline p-2 fs-16 text-primary"></i>
                                      <strong> 2 Free</strong> Domain Name
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline p-2 fs-16 text-primary"></i>{" "}
                                      <strong>3 </strong> One-Click Apps
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> 1 </strong> Databases
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Unlimited </strong> Cloud Storage
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Money </strong> BackGuarantee
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> 24/7</strong> support
                                    </li>
                                  </ul>
                                </Card.Body>
                                <div className="card-footer text-center border-top-0 pt-1">
                                  <button className="btn btn-lg btn-primary btn-block">
                                    <span className="ms-4 me-4">Select</span>
                                  </button>
                                </div>
                              </Card>
                            </Col>
                            <Col sm={12} lg={4}>
                              <Card className="pricing-card advanced">
                                <Card.Header className="d-block text-justified">
                                  <p className="fs-18 fw-semibold mb-1 pe-0">
                                    Advanced
                                    <span className="tag bg-success tx-fixed-white float-end">
                                      Limited Deal
                                    </span>
                                  </p>
                                  <h4 className="text-justify fw-bold mb-1">
                                    {" "}
                                    <span className="me-2">$</span>
                                    <span className="me-1">129</span>
                                    <span className="fs-20">
                                      <span className="op-0-5 text-20">/</span>{" "}
                                      month
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <p className="fs-13 mb-2">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Iure quos debitis aliquam
                                    .
                                  </p>
                                  <p className="fs-13 mb-1 text-success">
                                    Billed monthly on regular basis!
                                  </p>
                                  <ul className="pricing-body ps-0">
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>{" "}
                                      <strong> 5 Free</strong> Domain Name
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong>5 </strong> One-Click Apps
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> 3 </strong> Databases
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> Unlimited </strong> Cloud Storage
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> Daily </strong> Backups
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> Money </strong> BackGuarantee
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> 24/7</strong> support
                                    </li>
                                  </ul>
                                </Card.Body>
                                <div className="card-footer text-center border-top-0 pt-1">
                                  <button className="btn btn-lg btn-success btn-block">
                                    <span className="ms-4 me-4">Select</span>
                                  </button>
                                </div>
                              </Card>
                            </Col>
                            <Col sm={12} lg={4}>
                              <Card className="pricing-card">
                                <Card.Header className="d-block text-justified">
                                  <p className="fs-18 fw-semibold mb-1 pe-0">
                                    Regular
                                  </p>
                                  <h4 className="text-justify fw-bold mb-1">
                                    {" "}
                                    <span className="me-2">$</span>
                                    <span className="me-1">69</span>
                                    <span className="fs-20">
                                      <span className="op-0-5 text-20">/</span>{" "}
                                      month
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <p className="fs-13 mb-1">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Iure quos debitis aliquam
                                    .
                                  </p>
                                  <p className="fs-13 mb-1  text-secondary">
                                    Billed monthly on regular basis!
                                  </p>
                                  <ul className="pricing-body ps-0">
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-secondary p-2 fs-16"></i>
                                      <strong> 1 Free</strong> Domain Name
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-secondary p-2 fs-16"></i>
                                      <strong>4 </strong> One-Click Apps
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-secondary p-2 fs-16"></i>
                                      <strong> 2 </strong> Databases
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Unlimited </strong> Cloud Storage
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Money </strong> BackGuarantee
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> 24/7</strong> support
                                    </li>
                                  </ul>
                                </Card.Body>
                                <div className="card-footer text-center border-top-0 pt-1">
                                  <button className="btn btn-lg btn-secondary btn-block">
                                    <span className="ms-4 me-4">Select</span>
                                  </button>
                                </div>
                              </Card>
                            </Col>
                          </Row>
                        </div>
                        <div
                          id="yearly"
                          className={`wrapper-full ${
                            activeTab === "yearly" ? "" : "hide"
                          }`}
                        >
                          <Row className="d-flex align-items-center justify-content-center">
                            <Col sm={12} lg={4}>
                              <Card className="pricing-card">
                                <Card.Header className="d-block text-justified">
                                  <p className="fs-18 fw-semibold mb-1 pe-0">
                                    Basic
                                  </p>
                                  <h4 className="text-justify fw-bold mb-1">
                                    {" "}
                                    <span className="me-2">$</span>
                                    <span className="me-1">399</span>
                                    <span className="fs-20">
                                      <span className="op-0-5 text-20">/</span>{" "}
                                      year
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <p className="fs-13 mb-1">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Iure quos debitis aliquam
                                    .
                                  </p>
                                  <p className="fs-13 mb-1 text-primary">
                                    Billed monthly on regular basis!
                                  </p>
                                  <ul className="pricing-body ps-0">
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline p-2 fs-16 text-primary"></i>
                                      <strong> 2 Free</strong> Domain Name
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline p-2 fs-16 text-primary"></i>{" "}
                                      <strong>3 </strong> One-Click Apps
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> 1 </strong> Databases
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Unlimited </strong> Cloud Storage
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Money </strong> BackGuarantee
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> 24/7</strong> support
                                    </li>
                                  </ul>
                                </Card.Body>
                                <div className="card-footer text-center border-top-0 pt-1">
                                  <button className="btn btn-lg btn-primary btn-block">
                                    <span className="ms-4 me-4">Select</span>
                                  </button>
                                </div>
                              </Card>
                            </Col>
                            <Col sm={12} lg={4}>
                              <Card className="pricing-card advanced">
                                <Card.Header className="d-block text-justified">
                                  <p className="fs-18 fw-semibold mb-1 pe-0">
                                    Advanced
                                    <span className="tag bg-success tx-fixed-white float-end">
                                      Limited Deal
                                    </span>
                                  </p>
                                  <h4 className="text-justify fw-bold mb-1">
                                    {" "}
                                    <span className="me-2">$</span>
                                    <span className="me-1">1,299</span>
                                    <span className="fs-20">
                                      <span className="op-0-5 text-20">/</span>{" "}
                                      year
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <p className="fs-13 mb-2">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Iure quos debitis aliquam
                                    .
                                  </p>
                                  <p className="fs-13 mb-1 text-success">
                                    Billed monthly on regular basis!
                                  </p>
                                  <ul className="pricing-body ps-0">
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>{" "}
                                      <strong> 5 Free</strong> Domain Name
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong>5 </strong> One-Click Apps
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> 3 </strong> Databases
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> Unlimited </strong> Cloud Storage
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> Daily </strong> Backups
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> Money </strong> BackGuarantee
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-success p-2 fs-16"></i>
                                      <strong> 24/7</strong> support
                                    </li>
                                  </ul>
                                </Card.Body>
                                <div className="card-footer text-center border-top-0 pt-1">
                                  <button className="btn btn-lg btn-success btn-block">
                                    <span className="ms-4 me-4">Select</span>
                                  </button>
                                </div>
                              </Card>
                            </Col>
                            <Col sm={12} lg={4}>
                              <Card className="pricing-card">
                                <Card.Header className="d-block text-justified">
                                  <p className="fs-18 fw-semibold mb-1 pe-0">
                                    Regular
                                  </p>
                                  <h4 className="text-justify fw-bold mb-1">
                                    {" "}
                                    <span className="me-2">$</span>
                                    <span className="me-1">699</span>
                                    <span className="fs-20">
                                      <span className="op-0-5 text-20">/</span>{" "}
                                      year
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <p className="fs-13 mb-1">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Iure quos debitis aliquam
                                    .
                                  </p>
                                  <p className="fs-13 mb-1  text-secondary">
                                    Billed monthly on regular basis!
                                  </p>
                                  <ul className="pricing-body ps-0">
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-secondary p-2 fs-16"></i>
                                      <strong> 1 Free</strong> Domain Name
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-secondary p-2 fs-16"></i>
                                      <strong>4 </strong> One-Click Apps
                                    </li>
                                    <li>
                                      <i className="mdi mdi-checkbox-marked-circle-outline text-secondary p-2 fs-16"></i>
                                      <strong> 2 </strong> Databases
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Unlimited </strong> Cloud Storage
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> Money </strong> BackGuarantee
                                    </li>
                                    <li>
                                      <i className="mdi mdi-close-circle-outline p-2 fs-16"></i>
                                      <strong> 24/7</strong> support
                                    </li>
                                  </ul>
                                </Card.Body>
                                <div className="card-footer text-center border-top-0 pt-1">
                                  <button className="btn btn-lg btn-secondary btn-block">
                                    <span className="ms-4 me-4">Select</span>
                                  </button>
                                </div>
                              </Card>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </Container>
                  </div>

                  <div
                    className="testimonial-owl-landing section pb-5"
                    id="clients"
                    onClick={() => handleClick("clients")}
                  >
                    <Container>
                      <Row>
                        <Col md={12}>
                          <div className="bg-transparent">
                            <Card.Body className="pt-5">
                              <h4 className="text-center fw-bold tx-fixed-white">
                                TESTIMONIALS{" "}
                              </h4>
                              <span className="landing-title"></span>
                              <h6 className="text-center fw-semibold tx-fixed-white op-8 mb-4">
                                What People Saying About us.
                              </h6>
                              <Swiper
                                dir={isRTL ? "rtl" : "ltr"}
                                centeredSlides={false}
                                autoplay={{
                                  delay: 2500,
                                  disableOnInteraction: false,
                                }}
                                navigation={false}
                                modules={[Autoplay, Pagination, Navigation]}
                                breakpoints={{
                                  320: { slidesPerView: 1, spaceBetween: 10 },
                                  480: { slidesPerView: 1, spaceBetween: 10 },
                                  640: { slidesPerView: 1, spaceBetween: 10 },
                                  768: { slidesPerView: 2, spaceBetween: 40 },
                                  1024: { slidesPerView: 2, spaceBetween: 40 },
                                  1440: { slidesPerView: 3, spaceBetween: 40 },
                                }}
                                className="mySwiper "
                              >
                                <SwiperSlide>
                                  <Card className="custom-card testimonial-card">
                                    <Card.Body>
                                      <p className="text-muted">
                                        <i className="fa fa-quote-left me-2 fs-20 text-primary op-4"></i>
                                        <span>
                                          venenatis vitae, justo. Nullam dictum
                                          felis eu pede mollis pretium. Integer
                                          tincidunt. Cras dapibus. Vivamus
                                          elementum semper nisi. Aenean
                                          vulputate eleifend tellus. Aenean leo
                                          ligula, porttitor eu.{" "}
                                        </span>
                                      </p>
                                      <div className="testimonia-data text-center">
                                        <h5 className="mb-0">Sophiee carr</h5>
                                        <p className="pb-3">Web Developer</p>
                                        <div className="carousel-img">
                                          <img
                                            src={ALLImages("user12")}
                                            className="rounded-circle"
                                            alt="img"
                                          />
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <Card className="custom-card testimonial-card">
                                    <Card.Body>
                                      <p className="text-muted">
                                        <i className="fa fa-quote-left me-2 fs-20 text-primary op-4"></i>
                                        <span>
                                          venenatis vitae, justo. Nullam dictum
                                          felis eu pede mollis pretium. Integer
                                          tincidunt. Cras dapibus. Vivamus
                                          elementum semper nisi. Aenean
                                          vulputate eleifend tellus. Aenean leo
                                          ligula, porttitor eu.
                                        </span>
                                      </p>
                                      <div className="testimonia-data text-center">
                                        <h5 className="mb-0">Ralph Alice</h5>
                                        <p className="pb-3">Web Developer</p>
                                        <div className="carousel-img">
                                          <img
                                            src={ALLImages("user1")}
                                            className="rounded-circle"
                                            alt="img"
                                          />
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <Card className="custom-card testimonial-card">
                                    <Card.Body>
                                      <p className="text-muted">
                                        <i className="fa fa-quote-left me-2 fs-20 text-primary op-4"></i>
                                        <span>
                                          venenatis vitae, justo. Nullam dictum
                                          felis eu pede mollis pretium. Integer
                                          tincidunt. Cras dapibus. Vivamus
                                          elementum semper nisi. Aenean
                                          vulputate eleifend tellus. Aenean leo
                                          ligula, porttitor eu.{" "}
                                        </span>
                                      </p>
                                      <div className="testimonia-data text-center">
                                        <h5 className="mb-0">Lois Lane</h5>
                                        <p className="pb-3">Web Developer</p>
                                        <div className="carousel-img">
                                          <img
                                            src={ALLImages("user16")}
                                            className="rounded-circle"
                                            alt="img"
                                          />
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <Card className="custom-card testimonial-card">
                                    <Card.Body>
                                      <p className="text-muted">
                                        <i className="fa fa-quote-left me-2 fs-20 text-primary op-4"></i>
                                        <span>
                                          {" "}
                                          venenatis vitae, justo. Nullam dictum
                                          felis eu pede mollis pretium. Integer
                                          tincidunt. Cras dapibus. Vivamus
                                          elementum semper nisi. Aenean
                                          vulputate eleifend tellus. Aenean leo
                                          ligula, porttitor eu.{" "}
                                        </span>
                                      </p>
                                      <div className="testimonia-data text-center">
                                        <h5 className="mb-0">Kramden</h5>
                                        <p className="pb-3">Web Developer</p>
                                        <div className="carousel-img">
                                          <img
                                            src={ALLImages("user14")}
                                            className="rounded-circle"
                                            alt="img"
                                          />
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <Card className="custom-card testimonial-card">
                                    <Card.Body>
                                      <p className="text-muted">
                                        <i className="fa fa-quote-left me-2 fs-20 text-primary op-4"></i>
                                        <span>
                                          {" "}
                                          venenatis vitae, justo. Nullam dictum
                                          felis eu pede mollis pretium. Integer
                                          tincidunt. Cras dapibus. Vivamus
                                          elementum semper nisi. Aenean
                                          vulputate eleifend tellus. Aenean leo
                                          ligula, porttitor eu.{" "}
                                        </span>
                                      </p>
                                      <div className="testimonia-data text-center">
                                        <h5 className="mb-0">Ralph Alice</h5>
                                        <p className="pb-3">Web Developer</p>
                                        <div className="carousel-img">
                                          <img
                                            src={ALLImages("user1")}
                                            className="rounded-circle"
                                            alt="img"
                                          />
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <Card className="custom-card testimonial-card">
                                    <Card.Body>
                                      <p className="text-muted">
                                        <i className="fa fa-quote-left me-2 fs-20 text-primary op-4"></i>
                                        <span>
                                          {" "}
                                          venenatis vitae, justo. Nullam dictum
                                          felis eu pede mollis pretium. Integer
                                          tincidunt. Cras dapibus. Vivamus
                                          elementum semper nisi. Aenean
                                          vulputate eleifend tellus. Aenean leo
                                          ligula, porttitor eu.{" "}
                                        </span>
                                      </p>
                                      <div className="testimonia-data text-center">
                                        <h5 className="mb-0">Ralph Alice</h5>
                                        <p className="pb-3">Web Developer</p>
                                        <div className="carousel-img">
                                          <img
                                            src={ALLImages("user1")}
                                            className="rounded-circle"
                                            alt="img"
                                          />
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </SwiperSlide>
                              </Swiper>
                            </Card.Body>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>

                  <div
                    className="section bg-light"
                    id="faqs"
                    onClick={() => handleClick("faqs")}
                  >
                    <Container>
                      <Row>
                        <h4 className="text-center fw-bold mb-1">FAQ'S ?</h4>
                        <h6 className="text-center fw-semibold mb-5">
                          We are here to solve your queries.
                        </h6>
                        <span className="landing-title"></span>
                        <section className="sptb demo-screen-demo" id="faqs1">
                          <Row className="align-items-center">
                            <Col lg={6}>
                              <Card>
                                <Card.Header>
                                  <h3 className="card-title">Pricing Plans</h3>
                                </Card.Header>
                                <Card.Body>
                                  <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>
                                        How To Insert All The Plugins?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                      <Accordion.Header>
                                        How Can I contact?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                      <Accordion.Header>
                                        Can I use this Plugins in Another
                                        Template?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                      <Accordion.Header>
                                        It is Easy to Customizable?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                      <Accordion.Header>
                                        How can I download This template?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                      <Accordion.Header>
                                        How Can I Add another page in Template?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={6}>
                              <Card>
                                <Card.Header>
                                  <h3 className="card-title">
                                    Sales Questions
                                  </h3>
                                </Card.Header>
                                <Card.Body>
                                  <Accordion defaultActiveKey="3">
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>
                                        How To Insert All The Plugins?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                      <Accordion.Header>
                                        How Can I contact?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                      <Accordion.Header>
                                        Can I use this Plugins in Another
                                        Template?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                      <Accordion.Header>
                                        It is Easy to Customizable?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                      <Accordion.Header>
                                        How can I download This template?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                      <Accordion.Header>
                                        How Can I Add another page in Template?
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Anim pariatur cliche reprehenderit, enim
                                        eiusmod high life accusamus terry
                                        richardson ad squid. 3 wolf moon officia
                                        aute, non cupidatat skateboard dolor
                                        brunch. Food truck quinoa nesciunt
                                        laborum eiusmod. Brunch 3 wolf moon
                                        tempor, sunt aliqua put a bird on it
                                        squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim
                                        keffiyeh helvetica, craft beer labore
                                        wes anderson cred nesciunt sapiente ea
                                        proident. Ad vegan excepteur butcher
                                        vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth
                                        nesciunt you probably haven't heard of
                                        them accusamus labore sustainable VHS.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </section>
                      </Row>
                    </Container>
                  </div>

                  <div
                    className="section contact bg-white"
                    id="contact"
                    onClick={() => handleClick("contact")}
                  >
                    <Container>
                      <div className="">
                        <h4 className="text-center fw-bold mt-7">CONTACT</h4>
                        <span className="landing-title"></span>
                        <h6 className="text-center fw-semibold mb-5">
                          Get in touch with
                          <span className="text-primary"> US</span>.
                        </h6>
                        <Row>
                          <Col lg={6}>
                            <div className="border p-5 rounded-3 mb-lg-0 mb-2">
                              <h5>Contact Info</h5>
                              <div className="d-flex align-items-center mt-3">
                                <span className="avatar bg-primary-transparent rounded-pill">
                                  <i className="fe fe-phone  fs-16"></i>
                                </span>
                                <span className="ms-2 text-break">
                                  {" "}
                                  (+81) 8564 9546 1235
                                </span>
                              </div>
                              <div className="d-flex align-items-center mt-2">
                                <span className="avatar bg-primary-transparent rounded-pill">
                                  <i className="fe fe-mail fs-16"></i>
                                </span>
                                <span className="ms-2 text-break">
                                  Spruko.sprukoinfo.com1234@gmail.com
                                </span>
                              </div>
                              <div className="d-flex align-items-center mt-2">
                                <span className="avatar bg-primary-transparent rounded-pill">
                                  <i className="fe fe-clock fs-16"></i>
                                </span>
                                <span className="ms-2 text-break">
                                  Working Hours - Monday to Saturday, 9am - 6pm.
                                </span>
                              </div>
                              <div className="mt-4">
                                <iframe
                                  className="w-100"
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.6838699737186!2d78.56769087585883!3d17.474838600278606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c7ec139a15d%3A0x326d1c90786b2ab6!2sSPRUKO%C2%AE%20TECHNOLOGIES%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1701952554648!5m2!1sen!2sin"
                                  width="500"
                                  height="225"
                                  style={{ border: "0" }}
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                              </div>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="p-5 border rounded-3 mb-lg-0 mb-2">
                              <div>
                                <label className="mb-2 fw-500">
                                  Email
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <input
                                  className="form-control form-control-lg ms-0"
                                  type="email"
                                  placeholder="Enter your Email"
                                />
                              </div>
                              <div className="mt-3">
                                <label className="mb-2 fw-500">
                                  Name
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <input
                                  className="form-control form-control-lg ms-0"
                                  type="email"
                                  placeholder="Enter your name"
                                />
                              </div>
                              <div className="mt-3">
                                <label className="mb-2 fw-500">
                                  Phone
                                  <span className="text-danger ms-1">*</span>
                                </label>
                                <input
                                  className="form-control form-control-lg ms-0"
                                  type="email"
                                  placeholder="Enter your contact Number"
                                />
                              </div>
                              <div className="mt-3">
                                <label
                                  htmlFor="exampleFormControlTextarea1"
                                  className="form-label"
                                >
                                  Message
                                </label>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows={3}
                                ></textarea>
                              </div>
                              <div className="mt-3">
                                <Link to="#" className="btn btn-primary w-md">
                                  Send
                                </Link>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-footer tx-fixed-white">
          <Container>
            <Row>
              <div className="top-footer mb-4">
                <Row>
                  <Col lg={4} sm={12} md={12}>
                    <h6>ABOUT</h6>
                    <p className="tx-fixed-white op-8">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo.{" "}
                    </p>
                    <p className="mb-5 mb-lg-2 tx-fixed-white op-8">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur Excepteur sint
                      occaecat .{" "}
                    </p>
                  </Col>
                  <Col lg={2} sm={6} md={4}>
                    <h6>PAGES</h6>
                    <ul className="list-unstyled mb-5 mb-lg-0">
                      <li>
                        <Link
                          to={`${import.meta.env.BASE_URL}Dashboard/IndexPage/`}
                          className="tx-fixed-white op-8"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${import.meta.env.BASE_URL}UiKit/Alerts/`}
                          className="tx-fixed-white op-8"
                        >
                          Elements
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${import.meta.env.BASE_URL}Forms/FormElement/`}
                          className="tx-fixed-white op-8"
                        >
                          Forms
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${import.meta.env.BASE_URL}Charts/ApexCharts/`}
                          className="tx-fixed-white op-8"
                        >
                          Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }Tables/DefaultTables/`}
                          className="tx-fixed-white op-8"
                        >
                          Tables
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${import.meta.env.BASE_URL}Dashboard/IndexPage/`}
                          className="tx-fixed-white op-8"
                        >
                          Other Pages
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={2} sm={6} md={4}>
                    <h6>INFORMATION</h6>
                    <ul className="list-unstyled mb-5 mb-lg-0">
                      <li>
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }Pages/Extension/AboutCompany/`}
                          className="tx-fixed-white op-8"
                        >
                          Our Team
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${import.meta.env.BASE_URL}Pages/Extension/Faq/`}
                          className="tx-fixed-white op-8"
                        >
                          Contact US
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }Pages/Extension/AboutCompany/`}
                          className="tx-fixed-white op-8"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }Pages/Extension/Terms/`}
                          className="tx-fixed-white op-8"
                        >
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }Pages/Extension/Blog/`}
                          className="tx-fixed-white op-8"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }Pages/Extension/Terms/`}
                          className="tx-fixed-white op-8"
                        >
                          Terms and Services
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col lg={4} sm={12} md={4}>
                    <h6>CONTACT</h6>
                    <p className="mb-2 tx-fixed-white op-8">
                      {" "}
                      London, LN 455121, UK
                    </p>
                    <p className="mb-2 tx-fixed-white op-8">
                      {" "}
                      sprukoinfo@gmail.com
                    </p>
                    <p className="mb-2 tx-fixed-white op-8">
                      {" "}
                      Working Hours 09.00am - 06.00pm
                    </p>
                    <p className="mb-2 tx-fixed-white op-8"> + 51 652 551 54</p>

                    <ul className="btn-list mt-4">
                      <li className="btn bg-primary-transparent">
                        <i className="fa fa-facebook"></i>
                      </li>
                      <li className="btn bg-secondary-transparent">
                        <i className="fa fa-google"></i>
                      </li>
                      <li className="btn bg-info-transparent">
                        <i className="ri-twitter-x-fill"></i>
                      </li>
                      <li className="btn bg-warning-transparent">
                        <i className="fa fa-linkedin"></i>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Row>
          </Container>
          <footer className="main-footer text-center">
            <Row className="">
              <Col md={12} sm={12}>
                {" "}
                Copyright © <span id="year">
                  {new Date().getFullYear()}
                </span>{" "}
                <Link to="#">Vexel</Link>. Designed with{" "}
                <span className="fa fa-heart text-danger"></span> by{" "}
                <Link to="#"> Spruko </Link> All rights reserved.
              </Col>
            </Row>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Landingpage);
