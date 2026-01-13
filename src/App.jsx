import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo } from './utils/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // 할일 목록 불러오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      // 네트워크 에러인 경우 백엔드 서버가 실행되지 않은 것으로 간주
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        setError('할일을 불러오는데 실패했습니다: ' + err.message);
      }
      console.error(err);
      // 에러가 발생해도 빈 배열로 설정하여 UI는 표시
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 할일 추가
  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      alert('할일을 추가하는데 실패했습니다.');
      console.error(err);
    }
  };

  // 할일 수정
  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodo(id, todoData);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      throw err; // TodoItem에서 처리
    }
  };

  // 할일 삭제
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      throw err; // TodoItem에서 처리
    }
  };

  return (
    <div className="app" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem 1rem' }}>
      <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header className="app-header" style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>📝 할일 관리</h1>
          <p style={{ fontSize: '1.1rem', margin: '0', opacity: '0.9' }}>할일을 추가, 수정, 삭제하고 완료 상태를 관리하세요</p>
        </header>

        <TodoForm onSubmit={handleCreateTodo} />

        {loading && (
          <div className="loading" style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '1rem' }}>
            <p>할일을 불러오는 중...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error" style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '1rem', color: '#d32f2f' }}>
            <p style={{ margin: '0 0 1rem 0' }}>{error}</p>
            <button 
              onClick={fetchTodos}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#646cff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              다시 시도
            </button>
          </div>
        )}

        {!loading && (
          <>
            <div className="todos-header" style={{ marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontSize: '1.5rem', margin: '0', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>
                할일 목록 ({todos.length})
              </h2>
            </div>
            {todos.length === 0 ? (
              <div className="empty-state" style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', color: '#666' }}>
                <p style={{ margin: '0', fontSize: '1.1rem' }}>
                  {error ? '백엔드 서버에 연결할 수 없습니다. 할일을 추가해보세요!' : '할일이 없습니다. 새로운 할일을 추가해보세요!'}
                </p>
              </div>
            ) : (
              <div className="todos-list">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
