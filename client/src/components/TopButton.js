const TopButton = ({ isMain }) => {
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`fixedBtn top${isMain ? " main" : ""}`} onClick={moveToTop}>
      <i className="fas fa-angle-double-up" />
    </div>
  );
};

export default TopButton;
