import { useHistory } from "react-router";

export default function RankList({ content }) {
  const history = useHistory();
  return (
    <li className="ranking--content">
      <div className="ranking--content-rank">{content.rank} 위</div>
      <div className="ranking--profile">
        <img
          src={content.img}
          alt="profile"
          onClick={() => {
            history.push(`profile/${content.userId}`);
          }}
        />
        <div
          onClick={() => {
            history.push(`profile/${content.userId}`);
          }}
        >
          {content.nickname}
        </div>
      </div>
      <div className="ranking--content-win">{content.win} 승</div>
      <div className="ranking--content-lose">{content.lose} 패</div>
      <div className="ranking--content-rate">
        승률{" "}
        {parseInt(
          (content.win / (content.win + content.lose)).toFixed(2) * 100
        )}
        %
      </div>
      <div className="ranking--content-point">{content.point} 점</div>
    </li>
  );
}
