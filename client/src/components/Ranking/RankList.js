import { useHistory } from "react-router";

export default function RankList({ content }) {
  const history = useHistory();
  return (
    <li className="ranking--content">
      <div>{content.rank}위</div>
      <div
        className="ranking--profile"
        onClick={() => {
          history.push(`profile/${content.userId}`);
        }}
      >
        <img src={content.img} alt="profile" />
        {content.nickname}
      </div>
      <div className="ranking--content-win">{content.win}승</div>
      <div className="ranking--content-lose">{content.lose}패</div>
      <div className="ranking--content-point">{content.point}점</div>
    </li>
  );
}
