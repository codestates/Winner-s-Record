export default function NoImage() {
  return (
    <div className="create--nopost--container">
      <div className="icon">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <div className="text--container">
        <div className="title">업로드된 사진이 없습니다.</div>
        <div className="title">자동으로 종목별 기본사진이 업로드됩니다.</div>
      </div>
    </div>
  );
}
