import ProjectPage from "../components/ProjectPage";
import LinkButton from "../components/LinkButton";
export default function MIDI() {
  return (
    <ProjectPage title="MIDI Signal Augmenter">
      <LinkButton route="https://github.com/material-kish/SuperCollider-Vault/blob/main/Final%20Project/Feit_Mann_431_HW_7_(Final_Project).scd">
        <i className="fa-brands fa-github"></i>
        Github Repo
      </LinkButton>
      <p>
        This was a project I did for an elective in college on computer music.
        Using this program I wrote in&nbsp;
        <a href="https://supercollider.github.io/" target="_blank">
          SuperCollider
        </a>
        , musicians can play notes on any common peripheral controller, and have
        transformations applied to the&nbsp;
        <a href="https://en.wikipedia.org/wiki/MIDI" target="_blank">
          MIDI
        </a>
        &nbsp;signals which can cause a number of effects, such as creating
        chords from each note press, or automatically playing a held chord as an
        arpeggio.
      </p>
      <p>
        Chord mode and Arpeggio mode can each be toggled independently. When
        only chord mode is on, single note presses result in a whole chord being
        output. Users can choose between major, minor, diminished, major 7th,
        minor 7th, dominant 7th, sus2, sus4, and augmented chords.
      </p>
      <p>
        When only arpeggio mode is on, any notes held down will play one after
        the other in a loop. There are several patterns to choose from:
        <li>
          Upward: plays notes starting from lowest to highest before looping
        </li>
        <li>
          Downward: plays notes starting from highest to lowest before looping
        </li>
        <li>Random: plays notes in completely random order</li>
        <li>
          Random Walk: plays a random note, then randomly plays either the next
          highest note or next lowest note
        </li>
        <li>
          Ping Pong: plays notes starting from lowest to highest, then highest
          to lowest, and repeats
        </li>
      </p>
      <p>
        Users can also enable both modes at the same time, allowing them to
        create complex arpeggiated patterns with a single note press.
      </p>
      <p>
        These functions usually exist in most commercial Digital Audio Software
        (DAW) programs, such as the one I use,&nbsp;
        <a href="https://www.ableton.com/en/live/" target="_blank">
          Ableton Live
        </a>
        . I decided on this project because I wanted to see what it would be
        like to build these things myself, and to learn what sort of technical
        challenges I might be taking for granted under the hood.
      </p>
    </ProjectPage>
  );
}
