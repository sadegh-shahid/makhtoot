import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[var(--brand)] flex items-center justify-center text-white font-bold">م</div>
      <span className="font-bold text-base md:text-lg">گالری هنر پارسی</span>
    </Link>
  );
}
