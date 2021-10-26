const PostModal = ({ setIsModalActive }) => {
  return (
    <div className="modal--backdrop">
      <div className="modal--view">
        <div
          onClick={() => {
            setIsModalActive(false);
          }}
        ></div>
      </div>
    </div>
  );
};

export default PostModal;
