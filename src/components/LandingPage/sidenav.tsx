import React, { FC, Fragment, useEffect, useState } from "react";
import { LandingMenuData } from "../../common/Sidemenudata";
import { Link } from "react-router-dom";

interface ComponentProps {}

const Sidenav: FC<ComponentProps> = () => {
  const [menuData, setMenuData] = useState(LandingMenuData);

  const handleToggle = (index: number) => {
    const updatedMenuData = [...menuData];
    const clickedItem = updatedMenuData[index];

    if (clickedItem.type === "sub") {
      clickedItem.isOpen = !clickedItem.isOpen;
      setMenuData(updatedMenuData);
    }
  };

  const onScroll = () => {
    const sections = document.querySelectorAll(".side-menu__item");
    const scrollPos =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.querySelector("body")?.scrollTop ||
      0;

    sections.forEach((elem) => {
      const value = elem.getAttribute("href") ?? "";
      const targetId = value.substring(1); // Remove '#' from the value
      const refElement = document.getElementById(targetId) as HTMLElement;

      if (refElement) {
        const scrollTopMinus = scrollPos + 73;
        if (
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
      }
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href");

    if (target && target.startsWith("#")) {
      const location = document.getElementById(target.substring(1))?.offsetTop;

      if (location !== undefined) {
        window.scrollTo({
          left: 0,
          top: location - 64,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const pageLinks = document.querySelectorAll(".side-menu__item");
    pageLinks.forEach((elem) => {
      elem.addEventListener("click", handleClick as unknown as EventListener);
    });

    return () => {
      pageLinks.forEach((elem) => {
        elem.removeEventListener(
          "click",
          handleClick as unknown as EventListener
        );
      });
    };
  }, []);

  return (
    <Fragment>
      <ul className="main-menu">
        {menuData.map((menuItem, index1) => (
          <li
            className={`slide ${
              menuItem.type === "sub" && menuItem.isOpen ? "has-sub open" : ""
            }`}
            key={index1}
          >
            {["link"].includes(menuItem.type) && (
              <a
                className="side-menu__item"
                href={menuItem.href}
                onClick={() => handleToggle(index1)}
              >
                <span
                  className={`side-menu__label ${
                    menuItem.type === "sub" ? "me-3" : ""
                  }`}
                >
                  {menuItem.label}
                </span>
                {menuItem.type === "sub" && (
                  <i className="fe fe-chevron-right side-menu__angle"></i>
                )}
              </a>
            )}

            {menuItem.type === "sub" && menuItem.children && (
              <ul
                className={`slide-menu child1 ${
                  menuItem.isOpen ? "d-block" : "d-none"
                }`}
              >
                {menuItem.children.map((subItem, index2) => (
                  <li className="slide" key={index2}>
                    {["link", "sub"].includes(subItem.type) && (
                      <a
                        className="side-menu__item"
                        href={subItem.href}
                        onClick={() => handleToggle(index2)}
                      >
                        {subItem.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <div className="header-nav-right p-3 d-block d-lg-none">
          <Link
            to={`${import.meta.env.BASE_URL}Firebase/Firebasesignup/`}
            className="btn ripple btn-block btn-min w-sm btn-outline-primary me-2 my-2"
            target="_blank"
          >
            New User
          </Link>
          <Link
            to={`${import.meta.env.BASE_URL}Firebase/Firebasesignin/`}
            className="btn ripple btn-min btn-block w-sm btn-primary me-2 my-2"
            target="_blank"
          >
            Login
          </Link>
        </div>
      </ul>
    </Fragment>
  );
};

export default Sidenav;
