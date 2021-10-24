import { useHistory } from "react-router";

export default function Landing() {
  const history = useHistory();
  return (
    <>
      <div>Landing</div>
      <button onClick={() => history.replace("/main")}>시작하기</button>
    </>
  );
}
