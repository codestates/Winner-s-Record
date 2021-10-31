import { useHistory } from "react-router";

export default function RankList({ content }) {
  const history = useHistory();
  return (
    <li>
      <span>{content.rank}등</span>
      <span
        onClick={() => {
          history.push(`profile/${content.userId}`);
        }}
      >
        <img style={{ width: "100px", height: "100px" }} src={content.img} />
        {content.nickname}
      </span>
      <span>{content.win}승</span>
      <span>{content.lose}패</span>
      <span>{content.point}점</span>
    </li>
  );
}
