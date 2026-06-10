import ProjectPage from "../components/ProjectPage";
export default function Strudel() {
  const songs = [
    {
      title: "Ocarina Beat",
      url: "https://strudel.cc/#Ly8gQHRpdGxlIE9jYXJpbmEgQmVhdAovLyBAYnkgSmFjb2IgRmVpdCBNYW5uCgoKY29uc3Qgb2NhcmluYSA9ICBuKCI8MiBbLSAxXSAtIFs8MyAtID4gIDw0IDUgNj5dID4qNCIuYWRkKDApKS5zY2FsZSgiRjptYWpvciIpLnNvdW5kKCJvY2FyaW5hIikuY29sb3IoInllbGxvdyIpCiAgLmFkc3IoIi4wNTouNDouNzouNiIpCiAgLnJvb20oMC4zKS5kZWxheSgiMC44OjAuNjowLjYiKQpjb25zdCBndWl0YXIgPSAgbigiPDIgWy0gMV0gLSBbPDMgLSA%2BICA8NCA1IDY%2BXSA%2BKjQiLmFkZCgwKSkuc2NhbGUoIkY6bWFqb3IiKS5zb3VuZCgiZ21fZWxlY3RyaWNfZ3VpdGFyX2pheno6OCIpLmNvbG9yKCJwaW5rIikKICAuYXR0YWNrKDAuMDUpLmRlY2F5KDAuMSkuc3VzdGFpbigwLjMpLnJlbGVhc2UoMC42KQogIC5oYXJkKCI0Oi4wNiIpCiAgLnJvb20oIjAuNzo0IikuZGVsYXkoIjAuNDowLjQ6MC4yIikKY29uc3QgcmVlc2UgPSBub3RlKCI8W2YxIGExXSBbYzFAMyBlMV0%2BLzIiKS5zb3VuZCgiZ21fc3ludGhfYnJhc3NfMSIpLmNvbG9yKCJ0ZWFsIikKY29uc3Qga2lja1NuYXJlID0gcygiPGJkIHNkPioyIikuYmFuaygiYm9zc2RyMTEwIikucm9vbSgiMC4yOjAuMyIpLmNvbG9yKCJibHVlIikKY29uc3QgaGF0cyA9IHMoImhoKjIgW2hoIGhoIGhoXSBoaCoyIDxoaCBbaGggW2hoIGhoXV0%2BIikuYmFuaygiYm9zc2RyMTEwIikuZ2FpbigwLjIpLnJvb20oIjAuMTowLjEiKS5jb2xvcigiYmx1ZSIpCmNvbnN0IHJpbSA9IHMoIi0gLSA8IC0gcmltID4iKS5iYW5rKCJhbGVzaXNzcjE2IikuZ2FpbigwLjQpLmNvbG9yKCJibHVlIikKY29uc3QgZHJ1bXMgPSBzdGFjayhraWNrU25hcmUsIGhhdHMsIHJpbSkKCiQ6IHN0YWNrKAogIGFycmFuZ2UoWzE2LCBvY2FyaW5hXSksCiAgYXJyYW5nZShbOCwgc2lsZW5jZV0sIFs4LCByZWVzZV0pLAogIGFycmFuZ2UoWzgsIHNpbGVuY2VdLCBbOCwgZHJ1bXNdLCBbNCwgc2lsZW5jZV0sIFsxMiwga2lja1NuYXJlXSksCiAgYXJyYW5nZShbNCwgc2lsZW5jZV0sIFs0LCBndWl0YXJdKSwKKS5waWFub3JvbGwoe2xhYmVsczogMX0p",
    },
    {
      title: "A Moody Song",
      url: "https://strudel.cc/#Ly8gQHRpdGxlIEEgTW9vZHkgU29uZwovLyBAYnkgSmFjb2IgRmVpdCBNYW5uCgpjb25zdCBzYXggPSBub3RlKCI8YSNAMiBbIGEgZiBdIC0gZyBlIGcgZD4qNCwgZiBhIGQgZSIpCiAgICAgICAgLnNvdW5kKCJzYXhfc3RhY2MiKS5kZWxheSgiMC40OjEvMyIpCiAgICAgICAgLmxwZigiWyAzMDBAMyA2MDAqMyAxMDAwIDIwMDAgXS8yIikKICAgICAgICAuY29sb3IoInRlYWwiKQpjb25zdCB0cmlhbmdsZUhpdCA9IHNvdW5kKCJ0cmlhbmdsZXMvMiIpLmdhaW4oMTgpLmRlbGF5KCIwLjU6MS80IikucmVwbGljYXRlKDIpLmNvbG9yKCJ5ZWxsb3ciKQoKY29uc3QgcGlhbm8gPSBzdGFjaygKICAgICAgICAiYTIgZzIiLAogICAgICAgICJjMiBhIzIiLAogICAgICAgICJlMyBmIiwKICAgICAgICAiZzQgYTQiLm9mZigxLzE2LCB4PT54LmFkZCg3KSksCikuY29sb3IoImdyZWVuIikuc2xvdygyKS5ub3RlKCkuc291bmQoInBpYW5vIikuZGVsYXkoIjAuNjoxLzEyIikKY29uc3Qga2ljayA9IHMoIjxiZCBbYmQgLSAtIGJkIF0%2BIDwtIFsgLSBiZF0%2BIikuY29sb3IoInB1cnBsZSIpLmJhbmsoImFsZXNpc2hyMTYiKQpjb25zdCBoYXRzID0gcygiaGghNCAtIGhoITMiKS5jb2xvcigid2hpdGUiKS5iYW5rKCJkcjIyMCIpLmdhaW4oIjwwLjE4QDMgMC4zPio4IikucGFuKCJbIDAuOCAwLjIgXSoyIikubHBmKDEwMDAwKQpjb25zdCBwZXJjTG9vcCA9IG4oIjwgMSA8MiAyKjI%2BIDQgMyA%2BKjgiKS5jb2xvcigib3JhbmdlIikucygicGVyYyIpLmJhbmsoImFsZXNpc2hyMTYiKS5nYWluKDAuMikucGFuKCI8IDAuMSAwLjkgPioyIikKCiQ6IHN0YWNrKAogICAgICAgIGFycmFuZ2UoWzE2LCBzYXhdKSwKICAgICAgICBhcnJhbmdlKFs0LCBzaWxlbmNlXSwgWzI4LCB0cmlhbmdsZUhpdF0sIFs4LCBzaWxlbmNlXSwgWzE2LCB0cmlhbmdsZUhpdF0pLAogICAgICAgIGFycmFuZ2UoWzgsIHNpbGVuY2VdLCBbOCwgcGlhbm9dLCBbMiwgc2lsZW5jZV0sIFsxNCwgcGlhbm9dKSwKICAgICAgICBhcnJhbmdlKFsxNiwgc2lsZW5jZV0sIFsxNiwga2lja10pLAogICAgICAgIGFycmFuZ2UoWzE2LCBzaWxlbmNlXSwgWzE2LCBoYXRzXSwgWzE2LCBzaWxlbmNlXSwgWzEyLCBoYXRzXSksCiAgICAgICAgYXJyYW5nZShbMjQsIHNpbGVuY2VdLCBbOCwgcGVyY0xvb3BdKSwKKS5wdW5jaGNhcmQoe2xhYmVsczogMX0p",
    },
  ];
  return (
    <ProjectPage title="Strudel Compositions">
      <p>
        Some experiments in coding music using{" "}
        <a href="https://strudel.cc/workshop/getting-started/" target="_blank">
          Strudel
        </a>
        . You can mess around with the code and press "update" to hear your
        changes. When a song is focused,{" "}
        <span className="bg-bg-dark p-1">ctrl + enter</span> = play/update and{" "}
        <span className="bg-bg-dark p-1">ctrl + .</span> = stop (even on Mac,
        it's ctrl, not cmd).
      </p>
      <p>At time of writing, the audio won't play on mobile.</p>
      <div className="grid grid-col w-full gap-2">
        {songs.map((song, i) => (
          <details key={song.url} className="border border-primary">
            <summary className="cursor-pointer text-xl px-3 py-2 font-sans select-none">
              {song.title ?? `Composition ${i + 1}`}
            </summary>
            <iframe className="w-full min-h-70 h-140" src={song.url}></iframe>
          </details>
        ))}
      </div>
    </ProjectPage>
  );
}
