


const StyledHeading = ({bg_text, fg_text}) => {
  return (
    <div className="relative w-[100%] m-auto flex flex-col items-center justify-center xl:py-16 md:py-12 py-4">
      <div className="absolute top-0 text-gray-950 drop-shadow-[0_0px_1px_rgba(255,255,255,0.8)] xl:text-[180px] md:text-[100px] text-[60px] font-black ">
        {bg_text}
      </div>
      <div className="relative z-[5] text-white xl:text-[100px] md:text[60px] text-[40px] font-black ">
        {fg_text}
      </div>
    </div>
  );
};

export default StyledHeading;
