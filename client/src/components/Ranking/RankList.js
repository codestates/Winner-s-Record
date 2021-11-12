import { useHistory } from "react-router";

export default function RankList({ content }) {
  const history = useHistory();
  const handleMedalImg = (rank) => {
    if (rank === 1) {
      return "https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%80%E1%85%B3%E1%86%B7.png";
    }
    if (rank === 2) {
      return "https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%8B%E1%85%B3%E1%86%AB.png";
    }
    if (rank === 3) {
      return "https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%83%E1%85%A9%E1%86%BC.png";
    }
  };

  const winrate = parseInt(
    (content.win / (content.win + content.lose)).toFixed(2) * 100
  );

  return (
    <li className="ranking--content">
      <div className="ranking--content-rank">
        {content.rank > 3 || content.rank === "-" ? (
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
        승률 {isNaN(winrate) ? 0 : winrate}%
      </div>
    </li>
  );
}
