export default function HistoryList({ list }) {
  return (
    <ul>
      {list.map((e, index) => {
        return (
          <li key={index}>
            종목: {e.event} 승: {e.winner} 패: {e.loser} 날짜: {e.date}
          </li>
        );
      })}
    </ul>
  );
}
