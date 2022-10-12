// 로더 : 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해주거나,
// 이미지를 data URL 형식의 문자열로 변환한다.
// 뿐만아니라 CSS 파일을 자바스크립트에 직접 로딩할 수 있도록 해준다.

// 아래처럼 로더를 커스텀해줄 수 있다.
module.exports = function myWebpackLoader(content) {
    return content.replace('console.log(', 'alert(');
};
