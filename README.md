# Todo React App

할일을 추가, 수정, 삭제하고 완료 상태를 관리할 수 있는 React 애플리케이션입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

## 환경변수 설정

API 서버 주소를 환경변수로 설정할 수 있습니다.

### 1. .env 파일 생성

프로젝트 루트에 `.env` 파일을 생성하세요.

### 2. 환경변수 설정

`.env` 파일에 다음 중 하나를 추가하세요:

**로컬 개발 환경 (로컬 백엔드 서버 사용):**
```env
VITE_API_URL=http://localhost:5000/todos
```

**배포 환경 (Heroku 백엔드 서버 사용):**
```env
VITE_API_URL=https://todo-back-93965c69440d.herokuapp.com/todos
```

### 3. 개발 서버 재시작

환경변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm run dev
```

### 주의사항

- Vite는 환경변수에 `VITE_` 접두사가 필요합니다.
- 환경변수가 설정되지 않으면 기본값(Heroku 배포 주소)을 사용합니다.
- `.env` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함됨).

## 빌드

```bash
npm run build
```

## 기술 스택

- React 18
- Vite
- CSS3
