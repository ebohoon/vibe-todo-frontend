/**
 * API 서버 주소 설정
 * 
 * 환경변수를 사용하여 API 주소를 설정할 수 있습니다.
 * 
 * 사용 방법:
 * 1. 프로젝트 루트에 .env 파일 생성
 * 2. 다음 중 하나를 선택하여 추가:
 * 
 *    로컬 개발 (로컬 백엔드 서버 사용):
 *    VITE_API_URL=http://localhost:5000/todos
 * 
 *    배포 환경 (Heroku 백엔드 서버 사용):
 *    VITE_API_URL=https://todo-back-93965c69440d.herokuapp.com/todos
 * 
 * 3. 개발 서버 재시작 (npm run dev)
 * 
 * 주의: Vite는 환경변수에 VITE_ 접두사가 필요합니다.
 * 환경변수가 설정되지 않으면 기본값(Heroku 배포 주소)을 사용합니다.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://todo-back-93965c69440d.herokuapp.com/todos';

// 개발 모드에서 현재 사용 중인 API 주소를 콘솔에 출력
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', API_BASE_URL);
}

// 모든 할일 조회
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `서버 오류: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // 네트워크 에러인 경우
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('네트워크 오류: 백엔드 서버에 연결할 수 없습니다.');
    }
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// 특정 할일 조회
export const getTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('할일을 불러오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
};

// 할일 생성
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할일을 생성하는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// 할일 수정
export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할일을 수정하는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// 할일 삭제
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '할일을 삭제하는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
