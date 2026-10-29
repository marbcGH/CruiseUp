import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
      <h1 className="display text-6xl sm:text-8xl">Off the chart.</h1>
      <p className="mt-6 font-serif text-xl text-ink-soft">This page doesn&apos;t exist, or it sailed without you.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-chart">Back to the home page</Link>
    </div>
  );
}
