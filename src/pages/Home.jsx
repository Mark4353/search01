import { Link } from 'react-router-dom';
import './page.css';
export default function Home() {
  return (
    <>
    <div className="container">
      <header>
        <h2>фільми</h2>
        <ul>
          <li><Link to="/library">Бібліотека</Link></li>
          <li><Link to="/search">Пошук</Link></li>
        </ul>
      </header>
      <main>

      </main>
      </div>
    </>
  );
}
