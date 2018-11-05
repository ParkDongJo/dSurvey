# dSurvey
Decentralized Survey Service

## Frontend 준비
### 소스 다운로드
```
git clone https://github.com/BC-Starter/dSurvey.git
```

### Truffle, Web3 설치
```
npm install -g truffle web3@0.20.7
```

### Frontend 패키지 설치
```
cd dSurvey
cd frontend
npm install
```

* **truffle-hdwallet-provider 소스 수정**
  * ethereumjs-wallet/hdkey를 사용하고 있는데, 0.6.1 버전으로 올라가면서 경로가 ethereumjs-wallet/dist/hdkey로 변경되었다.
  * 그래서 node_module/truffle-hdwallet-provider/index.js의 2번째 줄의 경로를 변경해 줘야 한다.
  * github issue 참고 : https://github.com/trufflesuite/truffle-hdwallet-provider/issues/53
### 컨트랙트 컴파일
```
truffle compile
```

## 실행
### Frontend build
```
npm run build
```

## Backend 준비
### Backend 패키지 설치
```
cd ../backend
npm install
```

## 실행
### 파일 실행 권한 설정
```
cd bin
chmod 766 ./run-server.sh
```

### Run backend server
```
./run-server.sh
```
* 0.0.0.0:3000에 서버를 띄움

### forever (express 서버를 daemon으로 돌려 줌)
* 프로세스 리스트 확인

`./forever list`
* 프로세스 종료

`./forever stop [uid]`

