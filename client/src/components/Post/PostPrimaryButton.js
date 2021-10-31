import MatchButton from "./MatchButton";
import TournamentButton from "./TournamentButton";
import TradeButton from "./TradeButton";

const PostPrimaryButton = ({
  hostId,
  type,
  status,
  setLoginModal,
  setModalBtnType,
  player,
}) => {
  return (
    <>
      {type === "trade" ? (
        <TradeButton
          hostId={hostId}
          status={status}
          setModalBtnType={setModalBtnType}
        />
      ) : type === "match" ? (
        <MatchButton
          hostId={hostId}
          setLoginModal={setLoginModal}
          status={status}
          player={player}
          setModalBtnType={setModalBtnType}
        />
      ) : (
        <TournamentButton
          hostId={hostId}
          status={status}
          setLoginModal={setLoginModal}
        />
      )}
    </>
  );
};

export default PostPrimaryButton;
