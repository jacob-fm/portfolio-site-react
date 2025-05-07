import ProgrammingCard from "./ProgrammingCard";
import ProjectOverlay from "./ProjectOverlay";

const ProgrammingSection = () => {
	return (
		<section id="programming-work-section">
			<div className="section-heading">
				<h2>Programming Work</h2>
			</div>
			<ProgrammingCard
				onClick={() => window.showOverlay("spopularity-overlay")}
				title="Spotify Popularity Game (WIP)"
				description="A browser game where you try and match artists based on their Spotify popularity rating."
				imgSrc="/media/spopularity_thumbnail.png"
				imgAlt="Screenshot from Spotify Popularity Guessing Game"
			/>
			<ProjectOverlay
				id="spopularity-overlay"
				title="Spotify Popularity Guessing Game (WIP)"
				onClose={() => window.hideOverlay("spopularity-overlay")}
			>
				<p>
					Check out the game at&nbsp;
					<a href="https://spopularity.jacobfm.com" target="_blank">
						spopularity.jacobfm.com
					</a>
					,
					<br />
					or the GitHub repo at&nbsp;
					<a href="https://github.com/jacob-fm/spotify-guesser" target="_blank">
						github.com/jacob-fm/spotify-guesser
					</a>
					.
				</p>
				<p>
					This is a browser game I am currently working on as a way to learn
					React. It's based on a simple game my brothers and I came up with
					during a long car ride, that goes like this:
					<ol>
						<li>
							One person says the name of a musician or band, which acts as the
							target.
						</li>
						<li>
							The other players all choose a different musician or band, trying
							to match the target's monthly listener count on Spotify.
						</li>
						<li>
							The player who's guess is the closest wins the round, and sets the
							target for the next round.
						</li>
						<li>
							(Obviously, players are not allowed to look things up on their
							phones until after all the guesses have been submitted.)
						</li>
					</ol>
				</p>
				<p>
					The current version of the game is different in a few ways. <br />
					First, it's not multiplayer - I'd love to add a multiplayer mode in
					the future, but I want to get a really solid single-player mode
					working first. Instead of players taking turns setting the target for
					each other, the game is played in 5 rounds, where the target is
					randomly assinged.
				</p>
				<p>
					Second, players are guessing the popularity rating of the musician or
					band, not the monthly listener count. This is because Spotify doesn't
					expose monthly listener count via API, even though it is visible to
					users. At first I was worried that this would make the game less
					compelling, but after some feedback from friends and family, the game
					seems to be pretty entertaining as is.
				</p>
			</ProjectOverlay>

			<ProgrammingCard
				onClick={() => window.showOverlay("midi-overlay")}
				title="MIDI Signal Augmenter"
				description="A program for turning single note presses into chords and arpeggios."
				imgSrc="/media/midi_thumbnail.png"
				imgAlt="MIDI notes visualized"
			/>
			<ProjectOverlay
				id="midi-overlay"
				title="MIDI Signal Augmenter"
				onClose={() => window.hideOverlay("midi-overlay")}
			>
				<p>
					<a
						href="https://github.com/material-kish/SuperCollider-Vault/blob/main/Final%20Project/Feit_Mann_431_HW_7_(Final_Project).scd"
						target="_blank"
					>
						Github
					</a>
				</p>
				<p>
					This was a project I did for an elective in college on computer music.
					Using this program I wrote in&nbsp;
					<a href="https://supercollider.github.io/" target="_blank">
						SuperCollider
					</a>
					, musicians can play notes on any common peripheral controller, and
					have transformations applied to the&nbsp;
					<a href="https://en.wikipedia.org/wiki/MIDI" target="_blank">
						MIDI
					</a>
					&nbsp;signals which can cause a number of effects, such as creating
					chords from each note press, or automatically playing a held chord as
					an arpeggio.
				</p>
				<p>
					Chord mode and Arpeggio mode can each be toggled independently. When
					only chord mode is on, single note presses result in a whole chord
					being output. Users can choose between major, minor, diminished, major
					7th, minor 7th, dominant 7th, sus2, sus4, and augmented chords.
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
						Random Walk: plays a random note, then randomly plays either the
						next highest note or next lowest note
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
					These functions usually exist in most commercial Digital Audio
					Software (DAW) programs, such as the one I use,&nbsp;
					<a href="https://www.ableton.com/en/live/" target="_blank">
						Ableton Live
					</a>
					. I decided on this project because I wanted to see what it would be
					like to build these things myself, and to learn what sort of technical
					challenges I might be taking for granted under the hood.
				</p>
			</ProjectOverlay>

			<ProgrammingCard
				onClick={() => window.showOverlay("alien-egg-overlay")}
				title='"Alien Egg" Sculpture'
				description="An interactive sculpture built with clay, ultrasonic sensors, and sleep deprivation."
				imgSrc="/media/alien_egg/brain_rock_thumbnail.png"
				imgAlt="Alien Egg sculpture"
			/>
			<ProjectOverlay
				id="alien-egg-overlay"
				title='"Alien Egg" Sculpture'
				onClose={() => window.hideOverlay("alien-egg-overlay")}
			>
				<p>
					I built this sculpture for an exhibition of artwork by Yale college
					seniors. I had no prior experience with any of the materials I used -
					I had never made anything with clay, and more technically challenging,
					I had never built a physical circuit before or had any experience
					with&nbsp;
					<a href="https://en.wikipedia.org/wiki/Arduino" target="_blank">
						Arduinos
					</a>
					.
				</p>
				<p>
					I went into the project a bit unsure of what I was going to build, but
					after a few sessions at the pottery studio, and several all-nighters
					at the maker-space on campus, the project started to take literal and
					conceptual shape.
				</p>
				<p>
					What I ended up making was a small clay vessel, about the size of a
					football, with many holes along the surface. I crammed a bunch of LED
					strips inside, connected via an Arduino circuit to an ultrasonic
					sensor.
				</p>
				<p>
					<a
						href="https://github.com/material-kish/arduino_gold"
						target="_blank"
					>
						Link to GitHub repo of Arduino scripts for this project
					</a>
				</p>
				<figure>
					<img
						className="img-height-420"
						src="/media/alien_egg/wide_angle.jpg"
						alt="Wide angle shot of the Alien Egg sculpture in the gallery"
					/>
					<figcaption>The egg sitting in its enclave</figcaption>
				</figure>
				<p>
					I placed the sculpture on a pedestal, tucked away under the staircase
					in one of the showrooms of the gallery. As members of the audience
					approached the sculpture, the ultrasonic sensor would read the
					distance to the nearest person. This information was fed through the
					circuit such that as people approached the sculpture, the LED strips
					would shine brighter, and as they moved away, the lights would dim.
				</p>
				<div className="centered-column contain-img-height-220">
					<img
						src="/media/alien_egg/close_up.jpg"
						alt="Close-up shot of Alien Egg sculpture"
					/>
					<video preload="none" width="640" height="360" controls loop muted>
						<source src="/media/alien_egg/demonstration.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					<figcaption>Video of the sculpture in action</figcaption>
				</div>
			</ProjectOverlay>

			<ProgrammingCard
				onClick={() => window.showOverlay("high-noon-overlay")}
				title="High Noon"
				description="A very simple 3D platformer I built as a way of teaching myself the Unity engine."
				imgSrc="/media/high_noon/high_noon_thumbnail.png"
				imgAlt="Screenshot from High Noon game"
			/>
			<ProjectOverlay
				id="high-noon-overlay"
				title="High Noon"
				onClose={() => window.hideOverlay("high-noon-overlay")}
			>
				<p>
					A very simple 3D platformer I built as a way of teaching myself the
					Unity engine.
				</p>
				<p>
					It's available to download or play in the browser at&nbsp;
					<a href="https://jacobfm.itch.io/high-noon" target="_blank">
						https://jacobfm.itch.io/high-noon
					</a>
				</p>
				<p>
					You can find the GitHub repo at&nbsp;
					<a href="https://github.com/material-kish/high-noon" target="_blank">
						https://github.com/material-kish/high-noon
					</a>
				</p>
				<div className="centered-column mt">
					<img
						loading="lazy"
						src="/media/high_noon/cowboy_1.jpg"
						alt="Screenshot from High Noon 1/3"
					/>
					<img
						loading="lazy"
						src="/media/high_noon/cowboy_2.jpg"
						alt="Screenshot from High Noon 2/3"
					/>
					<img
						loading="lazy"
						src="/media/high_noon/cowboy_3.jpg"
						alt="Screenshot from High Noon 3/3"
					/>
				</div>
			</ProjectOverlay>

			<ProgrammingCard
				onClick={() => window.showOverlay("this-page")}
				title="This Website"
				description="My portfolio website, built with React"
				imgSrc="/media/portfolio-site-screenshot.png"
				imgAlt="A screenshot from this website"
			/>
			<ProjectOverlay
				id="this-page"
				title="This Website"
				onClose={() => window.hideOverlay("this-page")}
			>
				<p>
					This website was built with&nbsp;
					<a href="https://reactjs.org/" target="_blank">
						React
					</a>
					.
				</p>
				<p>
					The code is available on GitHub at&nbsp;
					<a
						href="https://github.com/jacob-fm/portfolio-site-react"
						target="_blank"
					>
						https://github.com/jacob-fm/portfolio-site-react
					</a>
				</p>
			</ProjectOverlay>
		</section>
	);
};
export default ProgrammingSection;
