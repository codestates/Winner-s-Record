const TopButton = () => {
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="topbtn" onClick={moveToTop}>
      Top
    </div>
  );
};

export default TopButton;
