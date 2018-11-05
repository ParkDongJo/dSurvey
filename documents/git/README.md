# dSurvey git 버전관리 규칙

## Commit 메시지

- 커밋 기본 형식
  ```
    (2) 설문지 생성을 위한 기능 구현했다
    
    - 설문지 컨트렉트 구현
    - 설문지 컨트롤러 컨트렉트 createSurvey() 구현
    
  ```
- 제목과 본문을 빈 행으로 분리한다

__[Commit 제목]__
- 제목 행을 50자로 제한한다
- 제목 행 끝에 마침표를 넣지 않는다
- 제목 행에 명령문을 사용한다

__[Commit 본문]__

- 본문을 72자 단위로 개행한다
- 어떻게 보다는 무엇과 왜를 설명한다

> Intelij에서 Commit Template Plugin을 활용한다
> VCS / COMMIT / Commit Tmpl plugin 선택
[참고 게시물](https://item4.github.io/2016-11-01/How-to-Write-a-Git-Commit-Message/)
