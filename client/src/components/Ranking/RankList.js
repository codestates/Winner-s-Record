import { useHistory } from "react-router";

export default function RankList({ content }) {
  const history = useHistory();
  const handleMedalImg = (rank) => {
    if (rank === 1) {
      return "https://cdn.discordapp.com/attachments/894417218526380033/907975532782686228/2.png";
    }
    if (rank === 2) {
      return "https://cdn.discordapp.com/attachments/894417218526380033/907975537065074718/3.png";
    }
    if (rank === 3) {
      return "https://cdn.discordapp.com/attachments/894417218526380033/907975538818297907/4.png";
    }
  };

  return (
    <li className="ranking--content">
      <div className="ranking--content-rank">
        {content.rank > 3 ? (
          `${content.rank}위`
        ) : (
          <img
            className="ranking--content-medal"
            alt="medal"
            src={handleMedalImg(content.rank)}
          />
        )}
      </div>
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
      <div className="ranking--content-point">{content.point}점</div>
      <div className="ranking--content-win">{content.win}승</div>
      <div className="ranking--content-lose">{content.lose}패</div>
      <div className="ranking--content-rate">
        승률{" "}
        {parseInt(
          (content.win / (content.win + content.lose)).toFixed(2) * 100
        )}
        %
      </div>
    </li>
  );
}
