import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <ul>
          <li>
            <Link to="/friends">Friends</Link>
          </li>
          <li>
            <Link to="/event">Events</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar
