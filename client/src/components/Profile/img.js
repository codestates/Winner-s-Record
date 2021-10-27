import {useRef} from "React"
import AWS from "aws-sdk"

const User = props => {

  const imgRef = useRef(null)
  // Cognito 연동으로 S3 접근 권한을 얻는 부분
  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId
    }),
  })

  const handleFileInput = e => {
    const file = e.target.files[0]

    // AWS sdk에 포함된 함수로 파일을 업로드하는 부분
    const upload = new AWS.S3.ManagedUpload({
        params: {
        Bucket: [S3 버킷명],
        Key: [파일명] + ".jpg",
        Body: file,
        },
    })

    const promise = upload.promise()

    promise.then(
        function (data) {
        alert("이미지 업로드에 성공했습니다.")
        },
        function (err) {
        return alert("오류가 발생했습니다: ", err.message)
        }
    )
}

  return (
    <>
      <input type="file" id="upload" className="image-upload" onChange = {handleFileInput} />
      <label htmlFor="upload" className="image-upload-wrapper">
         <img
        className="profile-img"
        ref={imgRef}
        src={`https://[버킷명].s3.ap-northeast-2.amazonaws.com/[파일명].jpg`}/>
        onError={() => {
            return (imgRef.current.src =
            "https://대체 이미지 링크")
        }}
        />
      </label>
    </>
  )
}