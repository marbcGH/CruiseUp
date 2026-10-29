import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & editorial policy",
  description: "Who we are, how we rate cruise lines, and how we use YouTube videos responsibly.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="display text-5xl sm:text-7xl">About Cruise Up</h1>
      <div className="prose-cruise mt-8">
        <p>
          Cruise Up is an independent cruise guide. We&apos;re not owned by, sponsored by or affiliated with any cruise line. Our goal is
          simple: help you choose the right line and ship, then get more out of the trip.
        </p>
        <h2 id="scores">How we score cruise lines</h2>
        <p>
          The ratings on our line guides and in the Line Matcher are editorial judgments on a 1–5 scale. They compare each line with the
          other Big 4 lines, not with luxury or expedition brands. We weigh the newest ships most heavily, because those are what most
          travelers book. Scores are never sold, and we review them whenever a line changes something meaningful.
        </p>
        <h2 id="accuracy">Keeping things accurate</h2>
        <p>
          Cruise lines change prices, packages and policies constantly. Every line guide shows when it was last reviewed, and articles show
          their update date. Always confirm pricing and policies with the cruise line before booking. Found something out of date? Tell us
          and we&apos;ll fix it.
        </p>
        <h2 id="videos">How we use videos</h2>
        <ul>
          <li>We only show videos through YouTube&apos;s official embedded player, which YouTube&apos;s Terms of Service allow when the creator has enabled embedding.</li>
          <li>We never download, re-upload, clip or re-host anyone&apos;s video.</li>
          <li>Every video is credited to its creator with a link to their channel, and paired with our own commentary on why it&apos;s worth watching.</li>
          <li>Nothing loads from YouTube until you press play, and playback uses YouTube&apos;s privacy-enhanced mode.</li>
          <li>If a creator removes a video or turns off embedding, it disappears from Cruise Up automatically.</li>
          <li>Creators can ask us to add or remove a video at any time and we&apos;ll do it promptly.</li>
        </ul>
        <h2 id="trademarks">Trademarks</h2>
        <p>
          Cruise line, ship and destination names are trademarks of their owners and are used only to identify them. Cover illustrations on
          Cruise Up are generated artwork, not photographs of real ships.
        </p>
      </div>
    </div>
  );
}
