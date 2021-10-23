export default function SignupCompleteModal({ isModalOpen, openModalHandler }) {
  return <>{isModalOpen ? <div className="modalBackdrop"></div> : <div />}</>;
}
