import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen py-12 px-6 md:px-24 bg-white box-border font-mono text-2xl">
      <h1 className="text-4xl md:text-6xl font-bold text-violet-600 mb-4">
        Welcome to medito-web!
      </h1>
      <p className="flex flex-col gap-5">
        <span>
          {">"} medito-web is a project inspired on the mobile application{" "}
          <a href="https://meditofoundation.org/" className="text-link">
            Medito
          </a>{" "}
          where I try to bring to the web the experience of meditation.
        </span>{" "}
        <span>
          {">"} It{"'"}s also an open source project from which I{"'"}ve learned a lot while
          building, so if you{"'"}re interested here{"'"}s{" "}
          <a
            href="https://github.com/tomaslobato/medito-web"
            className="text-link"
          >
            the code
          </a>
        </span>
        <Link href="/login" className="text-link">
          Unlock your streak with your first meditation!
        </Link>
      </p>
    </main>
  );
}
