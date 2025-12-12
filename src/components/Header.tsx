import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between px-5 py-2 bg-gray-300">
      <h1 className="text-xl font-bold ">Logo</h1>
      <nav className="space-x-5">
        <Link href={"/posts"}>posts</Link>
        <Link href={"/about"}>about</Link>
        <Link href={"/contact"}>contact</Link>
      </nav>
    </div>
  );
}
