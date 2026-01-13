import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editCompleted, setEditCompleted] = useState(todo.completed);

  const handleToggleComplete = async () => {
    try {
      await onUpdate(todo._id, {
        title: todo.title,
        description: todo.description || '',
        completed: !todo.completed,
      });
    } catch (error) {
      alert('완료 상태를 변경하는데 실패했습니다.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditCompleted(todo.completed);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    try {
      await onUpdate(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: editCompleted,
      });
      setIsEditing(false);
    } catch (error) {
      alert('할일을 수정하는데 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await onDelete(todo._id);
      } catch (error) {
        alert('할일을 삭제하는데 실패했습니다.');
      }
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <form onSubmit={handleSave}>
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-title"
              required
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-description"
              rows="2"
            />
            <div className="edit-actions">
              <label className="edit-checkbox">
                <input
                  type="checkbox"
                  checked={editCompleted}
                  onChange={(e) => setEditCompleted(e.target.checked)}
                />
                완료됨
              </label>
              <div className="edit-buttons">
                <button type="button" onClick={handleCancel} className="btn-cancel">
                  취소
                </button>
                <button type="submit" className="btn-save">
                  저장
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
          <div className="todo-actions">
            <button onClick={handleEdit} className="btn-edit" title="수정">
              ✏️
            </button>
            <button onClick={handleDelete} className="btn-delete" title="삭제">
              🗑️
            </button>
          </div>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-footer">
          <label className="todo-checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
            />
            <span>{todo.completed ? '완료됨' : '미완료'}</span>
          </label>
          {todo.createdAt && (
            <span className="todo-date">
              {new Date(todo.createdAt).toLocaleDateString('ko-KR')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
