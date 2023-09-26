import React, { useEffect, useState } from "react";
import { returnPaginationRange } from "../../utils/apUtils";

const Pagination = ({
  totalPage,
  page,
  limit,
  siblings,
  onPageChange,
  isMobileView,
}) => {
  let array = returnPaginationRange(
    totalPage,
    page,
    limit,
    siblings,
    isMobileView
  );
  const [justifyContent, setJustifyContent] = useState(
    "justify-content-center"
  );
  const [border, setBorder] = useState("1px solid #eee");
  const [padding, setPadding] = useState("1rem");
  const [fontSize, setFontSize] = useState("20px");
  const [marginRight, setMarginRight] = useState("0.5rem");

  useEffect(() => {
    if (isMobileView) {
      setJustifyContent("justify-content-start");
      setBorder("none");
      setPadding("0.2rem");
      setFontSize("15px");
      setMarginRight("0.2rem");
    } else {
      setJustifyContent("justify-content-center");
      setBorder("1px solid #eee");
      setPadding("1rem");
      setFontSize("20px");
      setMarginRight("0.5rem");
    }
  }, [isMobileView]);
  return (
    <ul
      className={`pagination pagination-md ${justifyContent}`}
      style={{
        border: border,
        padding: padding,
        width: "98%",
        borderRadius: "15px",
        marginTop: "-15px",
        flexWrap: "wrap",
      }}
    >
      <li className="page-item">
        <span
          onClick={() => onPageChange("&laquo;")}
          className="page-link"
          style={{
            marginRight: marginRight,
            color: "#000",
            fontSize: fontSize,
            borderRadius: "10px",
            padding: "0.3rem 1rem",
            cursor: "pointer",
          }}
        >
          &laquo;
        </span>
      </li>
      <li className="page-item">
        <span
          onClick={() => onPageChange("&lsaquo;")}
          className="page-link"
          style={{
            marginRight: marginRight,
            color: "#000",
            fontSize: fontSize,
            borderRadius: "10px",
            padding: "0.3rem 1rem",
            cursor: "pointer",
          }}
        >
          &lsaquo;
        </span>
      </li>
      {array.map((value) => {
        if (value === page) {
          return (
            <li key={value} className="page-item active">
              <span
                onClick={() => onPageChange(value)}
                className="page-link"
                style={{
                  marginRight: marginRight,
                  color: "#000",
                  fontSize: fontSize,
                  borderRadius: "10px",
                  padding: "0.3rem 1rem",
                  cursor: "pointer",
                }}
              >
                {value}
              </span>
            </li>
          );
        } else {
          return (
            <li key={value} className="page-item">
              <span
                onClick={() => onPageChange(value)}
                className="page-link"
                style={{
                  marginRight: marginRight,
                  color: "#000",
                  fontSize: fontSize,
                  borderRadius: "10px",
                  padding: "0.3rem 1rem",
                  cursor: "pointer",
                }}
              >
                {value}
              </span>
            </li>
          );
        }
      })}
      <li className="page-item">
        <span
          onClick={() => onPageChange("&rsaquo;")}
          className="page-link"
          style={{
            marginRight: marginRight,
            color: "#000",
            fontSize: fontSize,
            borderRadius: "10px",
            padding: "0.3rem 1rem",
            cursor: "pointer",
          }}
        >
          &rsaquo;
        </span>
      </li>
      <li className="page-item">
        <span
          onClick={() => onPageChange("&raquo;")}
          className="page-link"
          style={{
            marginRight: marginRight,
            color: "#000",
            fontSize: fontSize,
            borderRadius: "10px",
            padding: "0.3rem 1rem",
            cursor: "pointer",
          }}
        >
          &raquo;
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
