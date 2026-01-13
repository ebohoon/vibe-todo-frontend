import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>오류가 발생했습니다</h1>
          <p>{this.state.error?.message || '알 수 없는 오류'}</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
