const TopButton = () => {
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixedBtn top" onClick={moveToTop}>
      Top
    </div>
  );
};

export default TopButton;
