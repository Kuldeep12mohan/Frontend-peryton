"use client"
import React, { useRef, useEffect, useState } from "react";
import { Tilt } from "react-tilt";

const Glassy = ({
  icon,
  name,
  subtitle,
  servicePage,
  handleClick,
  itemName,
  handleDelete,
  id,
  homePage,
  contactPage
}) => {
  const main = useRef(null);
  const [cursor, setCursor] = useState(false);
  const cursorRef = useRef(null);
  const gradientRef = useRef(null);

  const toggle = () => {
    setCursor(true);
  };

  const toggle2 = () => {
    setCursor(false);
  };

  useEffect(() => {
    const handleCursor = (event) => {
      const containerRect = main.current.getBoundingClientRect();
      const containerHeight = containerRect.height;
      const containerWidth = containerRect.width;

      let newTop = event.clientY - containerRect.top;
      let newLeft = event.clientX - containerRect.left;

      // Calculate the position within the container
      newTop = (newTop / containerHeight) * 100;
      newLeft = (newLeft / containerWidth) * 100;

      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${newLeft - 5}%`;
        cursorRef.current.style.top = `${newTop}%`;
      }

      // Update gradient position
      if (gradientRef.current) {
        gradientRef.current.style.left = `${newLeft - 20}%`; // Adjust for the gradient size
        gradientRef.current.style.top = `${newTop - 20}%`;
      }
    };

    main.current.addEventListener("mousemove", handleCursor);
  }, []);

  const defaultOptions = {
    reverse: false,
    max: 20,
    perspective: 2000,
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <Tilt
      options={defaultOptions}
      style={{
        clipPath: cursor ? "inset(0)" : "none",
        borderRadius: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`md:w-[28vw] ${contactPage ? " h-fit sm:h-[25vw]" :"h-fit"}  w-[55vw] rounded-2xl flex justify-center items-center`}
    >
      {/* Gradient clipped by parent using clip-path */}
      {cursor && (
        <div
          ref={gradientRef}
          className={`gradient-blue z-[-10] rounded-full h-[140px] blur-[100px] w-[270px] absolute cursor ${
            cursor ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div
        ref={cursorRef}
        className={` cursor ${cursor ? "opacity-100" : "opacity-0"}`}
      />
      <div
        onMouseEnter={toggle}
        onMouseLeave={toggle2}
        ref={main}
        style={{ clipPath: "inset(0)" }}
        className={`${
          cursor
            ? "border-[2px] border-blue-700 "
            : "border-[1px] border-blue-300"
        }  text-[4vw] md:text-[2vw] h-[100%]  cursor-pointer pb-[10px]  bg-black bg-opacity-10 rounded-2xl text-white flex flex-col ${
          servicePage
            ? "gap-[1vw] w-[100%] h-fit"
            : "gap-[4vw] pt-[5vw] px-[4vw] w-[100%]"
        }`}
      >
        {!servicePage && <div>{icon}</div>}
        {servicePage && (
          <img
            src={icon}
            className="w-[100%] aspect_ratio_service rounded-2xl"
          />
        )}
        <div className={`${servicePage ? "ml-[2vw] mt-[1vw] text-[2vw] md:text-[1.5vw]" : ""}`}>
          {name}
        </div>
        {subtitle && (
          <div className="text-[2vw] md:text-[1.3vw]">{subtitle}</div>
        )}
        {servicePage && !homePage && (
          <div className="flex flex-row ">
            <div
              onClick={() => {
                itemName(name);
                handleClick();
              }}
              className="px-[1vw] ml-[2vw] w-fit bg-blue-600 text-[2.25vw] md:text-[1.25vw] py-[0.8vw] md:py-[0.2vw] rounded-lg"
            >
              Contact
            </div>
            <div
              onClick={() => {
              handleDelete(id);
              }}
              className="px-[1vw] ml-[2vw] w-fit bg-red-600 text-[2.25vw] md:text-[1.25vw] py-[0.8vw] md:py-[0.2vw] rounded-lg"
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </Tilt>
  );
};

export default Glassy;
