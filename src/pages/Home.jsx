import { Link } from 'react-router-dom';
import './page.css';
export default function Home() {
  return (
    <>
    <div className="container">
      <header>
        <h2>Movies</h2>
        <ul>
          <li><Link to="/library">library</Link></li>
          <li><Link to="/search">search</Link></li>
        </ul>
      </header>
      <main>

      </main>
      </div>
    </>
  );
}
