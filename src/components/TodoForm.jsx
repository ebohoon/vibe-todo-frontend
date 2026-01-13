import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), completed });
    if (!initialData) {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일 제목을 입력하세요"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="할일 설명을 입력하세요"
          rows="3"
        />
      </div>
      {initialData && (
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            완료됨
          </label>
        </div>
      )}
      <div className="form-actions">
        {initialData && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            취소
          </button>
        )}
        <button type="submit" className="btn-submit">
          {initialData ? '수정' : '추가'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
