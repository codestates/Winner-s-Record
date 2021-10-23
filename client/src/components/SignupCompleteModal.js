export default function SignupCompleteModal({ isModalOpen, openModalHandler }) {
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">hello</div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
