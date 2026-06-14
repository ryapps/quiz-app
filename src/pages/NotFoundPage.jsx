import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">
        Back to Home
      </Link>
    </div>
  );
}