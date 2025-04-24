import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="bg-[#333] text-white font-bold p-6 flex justify-between items-center shadow-lg">
        <Link to="/" className="text-base">
          Blog
        </Link>
        <Link to="/contact" className="text-base">
          お問い合わせ
        </Link>
      </header>
    </>
  );
}
