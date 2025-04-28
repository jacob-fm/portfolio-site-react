import ProgrammingCard from "./components/ProgrammingCard";
import DesignThumbnail from "./components/DesignThumbnail";
import ProjectOverlay from "./components/ProjectOverlay";
import "./style.scss";

function App() {
	window.showOverlay = function (overlayId) {
		const overlay = document.getElementById(overlayId);
		overlay.style.display = "flex";
		document.body.classList.add("overlay-active"); // Add class when showing overlay
	};

	window.hideOverlay = function (overlayId) {
		const overlay = document.getElementById(overlayId);
		overlay.style.display = "none";
		document.body.classList.remove("overlay-active"); // Remove class when hiding overlay
	};

	// Add click event listener to all overlay containers
	document.querySelectorAll(".project-overlay").forEach((overlay) => {
		overlay.addEventListener("click", function (event) {
			// If the click is directly on the overlay (not its children)
			if (event.target === overlay) {
				window.hideOverlay(overlay.id);
			}
		});
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			// Find all visible overlays and hide them
			document.querySelectorAll(".project-overlay").forEach((overlay) => {
				if (overlay.style.display !== "none") {
					window.hideOverlay(overlay.id);
				}
			});
		}
	});

	return (
		<>
			<div id="title-block">
				<h1>Jacob Feit Mann</h1>
				<h2>Developer and Designer</h2>
			</div>
			<div class="centered-column" id="main-links">
				<a href="#design-work-section">
					<h2>– Design Work –</h2>
				</a>
				<a href="#programming-work-section">
					<h2>– Programming Work –</h2>
				</a>
			</div>
			<div class="mt mb" id="contact-icons">
				<a href="https://www.instagram.com/i.love.kishka/" target="_blank">
					<i class="fa-brands fa-instagram"></i>
				</a>
				<a href="https://github.com/material-kish" target="_blank">
					<i class="fa-brands fa-github"></i>
				</a>
				<a href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com">
					<i class="fa-regular fa-envelope"></i>
				</a>
			</div>
			<div class="centered-row mt mb-4">
				<a href="#design-work-section">
					<svg
						width="93"
						height="42"
						viewBox="0 0 93 42"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M93 0C78.8164 6.65854 49.1244 24.3805 43.8247 42C37.2 24.8415 22.6767 10.5 0 0C19.3644 -4.00542e-05 35.1616 12.1219 43.8247 25.0975C53.6088 11.5756 80.6849 0.853658 93 0Z"
							fill="currentColor"
						/>
					</svg>
				</a>
			</div>
			<section id="design-work-section">
				<div class="section-heading">
					<h2>Design Work</h2>
				</div>
				<div class="gallery">
					<DesignThumbnail
						imageSrc="./src/media/avid/avid_thumbnail.jpg"
						imageAlt="AVID Fitness Logo"
						onClick={() => window.showOverlay("avid-overlay")}
					/>
					<ProjectOverlay
						id="avid-overlay"
						title="AVID Fitness - Branding and Website"
						onClose={() => window.hideOverlay("avid-overlay")}
					>
						<p>
							AVID's greatest asset was its strong sense of community, so while
							we experimented with some pretty "out-there" ideas for the
							rebrand, the owner, Avi, and I decided on a new logo that kept
							some attributes of the old one, but with a more energetic and
							sleeker feeling.
						</p>
						<h3>Logo and Branding</h3>
						<p>
							AVID's greatest asset is its strong sense of community, so while
							we experimented with some pretty "out-there" ideas for the
							rebrand, the owner, Avi, and I decided on a new logo that kept
							some attributes of the old one, but with a more energetic and
							sleeker feeling.
						</p>
						<div class="grid two-columns contain-img-height-180">
							<figure>
								<img
									src="./src/media/avid/old_avid_logo.jpeg"
									alt="Old AVID Fitness logo"
									loading="lazy"
								/>
								<figcaption>Old logo</figcaption>
							</figure>
							<figure>
								<img
									src="./src/media/avid/blue_on_white.jpg"
									alt="New AVID Fitness logo, white on blue background"
									loading="lazy"
								/>
								<figcaption>New logo</figcaption>
							</figure>
						</div>
						<figure>
							<div class="grid funky-grid-1">
								<img src="./src/media/avid/profile_pic_2.png" loading="lazy" />
								<img src="./src/media/avid/post1.png" loading="lazy" />
								<img src="./src/media/avid/story1.png" loading="lazy" />
								<img src="./src/media/avid/post4.png" loading="lazy" />
								<img src="./src/media/avid/multi-image.png" loading="lazy" />
								<img src="./src/media/avid/post2.png" loading="lazy" />
							</div>
							<figcaption class="mt">
								Social media templates and brand assets
							</figcaption>
						</figure>
						<h3>Website</h3>
						<a href="https://avidstrong.com" target="_blank">
							avidstrong.com
						</a>
						<p>
							I built AVID’s website with WordPress, using a theme called GoFiz.
							I customized the theme to fit the branding we had created in the
							first step, keeping in mind the themes of community, energy, and
							motivation which were core to the business.
						</p>
						<p>
							AVID uses a software called MindBody which takes care of tracking
							customer information: class enrollments, payment info, etc. I
							customized MindBody’s web widgets to match the brand, and embedded
							them the HTML of the site.
						</p>
						<div class="centered-column">
							<img
								src="./src/media/avid/homepage_screenshot.jpg"
								alt="AVID Homepage"
								loading="lazy"
							/>
							<img
								src="./src/media/avid/contact_screenshot.jpg"
								alt="AVID Contact Form"
								loading="lazy"
							/>
							<img
								src="./src/media/avid/classes_screenshot.jpg"
								alt="AVID CLasses Widget using MindBody"
								loading="lazy"
							/>
						</div>
					</ProjectOverlay>

					<DesignThumbnail
						imageSrc="./src/media/amoriem/amoriem_thumbnail.jpg"
						imageAlt="Amoriem Labs Logo"
						onClick={() => window.showOverlay("amoriem-overlay")}
					/>
					<ProjectOverlay
						id="amoriem-overlay"
						title="Amoriem Labs - Logo and Branding"
						onClose={() => window.hideOverlay("amoriem-overlay")}
					>
						<p>
							<a href="https://amoriem-labs.github.io/index.html">
								Amoriem Labs
							</a>
							is the undergraduate game development club at Yale University.
							Before I was project manager as a junior, I started as a
							first-year designing logos and UI elements. Amoriem’s name comes
							from the first game produced by its members. From Amoriem’s
							website:
						</p>
						<blockquote cite="https://amoriem-labs.github.io/about.html">
							The name is an anagram of memoria ("memory" in Latin), and
							includes the words amor ("love" in Spanish) and mori ("to die" in
							Latin).”
						</blockquote>
						<p>
							While my design philosophy is usually about emphasizing aesthetics
							and tone over gimmicks and “visual puns”, I decided to go against
							that guideline in creating the symbol used in the logo. In the
							landscape orientation, it resembles the buttons and D-pad of a
							typical gamepad layout. When rotated to the portrait orientation,
							it resembles (albeit abstractly) a skull with a heart on the
							forehead - a nod to the etymology of the group’s name.
						</p>
						<div class="grid two-columns">
							<img
								src="./src/media/amoriem/logo_landscape_icon.png"
								alt="Amoriem logo with icon in landscape orientation"
								loading="lazy"
							/>
							<img
								src="./src/media/amoriem/logo_portrait_icon.png"
								alt="Amoriem logo with icon in portrait orientation"
								loading="lazy"
							/>
						</div>
						<p>
							When choosing the brand colors, I first considered using
							<a href="https://yaleidentity.yale.edu/core-identity-elements/yale-colors">
								Yale’s signature blue
							</a>
							, but decided against it. Many clubs at Yale use those colors, so
							I figured that in order for our flyers and such to stand out, we
							would need to go a different route. I went with colors that were
							vibrant, exciting, and a bit unconventional to reflect the
							enthusiasm and slight avante-garde bent to the club’s game
							development ethos.
						</p>
						<p>
							Since my time with the club, the logo has been updated and
							streamlined - and I have to admit, while the skull imagery has
							been lost, the new logo is a fair bit cleaner and easier to read.
							Nevertheless, I’m happy with the original version, and glad to see
							that its DNA is still there.
						</p>
						<figure>
							<img
								class="img-height-180"
								src="./src/media/amoriem/new_logo.png"
								alt="Amoriem Labs' new logo"
								loading="lazy"
							/>
							<figcaption>The new logo</figcaption>
						</figure>
					</ProjectOverlay>

					<DesignThumbnail
						imageSrc="./src/media/gaming_counters/gaming_counters_thumbnail.png"
						imageAlt="Gaming Counters Collection Postcard"
						onClick={() => window.showOverlay("gaming-counters-overlay")}
					/>
					<ProjectOverlay
						id="gaming-counters-overlay"
						title="Yale Collections: 18th Century Chinese Gaming Tokens"
						onClose={() => window.hideOverlay("gaming-counters-overlay")}
					>
						<p>
							In the fall of my junior year of college, I took a course called
							Graphic Design Methodologies. One of the larger projects we were
							asked to produce was to produce a set of promotional materials for
							a hypothetical exhibition of something from
							<a href="https://www.yale.edu/collections" target="_blank">
								the Yale Collections.
							</a>
							After some digging, I came across a collection of Chinese
							mother-of-pearl gaming counters from the 18th and 19th centuries.
							If you’re interested in learning about the history of these
							pieces, I highly recommend reading more about it here:
							<a
								href="https://hdl.handle.net/10079/fa/beinecke.gamingcounters"
								target="_blank"
							>
								https://hdl.handle.net/10079/fa/beinecke.gamingcounters
							</a>
						</p>
						<p>
							At first, I was unsure how I would entice people to come view the
							exhibition. There were many potential angles of attack. I thought,
							for instance, that I might try to create materials that emphasized
							the multi-cultural history of these artifacts, which originated in
							China but mainly used in the West. But considering the wide array
							of materials I was to produce, and thinking about the hypothetical
							audience of these materials (busy college students barely glancing
							at bulletin boards), I decided on a more sensational approach.
							When I had initially visited the
							<a href="https://beinecke.library.yale.edu/" target="_blank">
								Beinecke Library
							</a>
							to view the collection and take photos, I was interested in the
							unique shapes of many of the tokens, and in the iridescence of the
							mother-of-pearl surface. I decided to see what I could do to
							emphasize these qualities. Iridescence is a hard thing to capture
							in a static photo, since its effect is only noticed when a surface
							is viewed from a variety of angles.
						</p>
						<p>
							We were asked to produce a series of flyers, postcards,
							promotional instagram posts, and finally a mockup of an
							installation to be shown along with the artifacts.
						</p>
						<h3>Postcards</h3>
						<div class="grid two-columns mb">
							<img
								src="./src/media/gaming_counters/postcard1.1.png"
								alt="First version of promotional postcard, 1/2"
								loading="lazy"
							/>
							<img
								src="./src/media/gaming_counters/postcard2.1.png"
								alt="First version of promotional postcard, 2/2"
								loading="lazy"
							/>
							<img
								src="./src/media/gaming_counters/postcard1.3.png"
								alt="Second version of promotional postcard, 1/2"
								loading="lazy"
							/>
							<img
								src="./src/media/gaming_counters/postcard2.3.png"
								alt="Second version of promotional postcard, 2/2"
								loading="lazy"
							/>
						</div>
						<h3>Flyers</h3>
						<div class="centered-row mb">
							<img
								src="./src/media/gaming_counters/flyer1.png"
								alt="Promotional flyer 1"
								loading="lazy"
							/>
							<img
								src="./src/media/gaming_counters/flyer2.png"
								alt="Promotional flyer 2"
								loading="lazy"
							/>
							<img
								src="./src/media/gaming_counters/flyer3.png"
								alt="Promotional flyer 3"
								loading="lazy"
							/>
						</div>
						<h3>Installation Mockup</h3>
						<p>
							I created a video showing what it might look like to have a
							blown-up image of one of the tokens, with a lenticular effect,
							such that at certain angles, an image of the family who owned this
							token would appear.
						</p>
						<div class="centered-row">
							<video loop autoplay>
								<source
									src="./src/media/gaming_counters/beinecke_exhibition.mp4"
									type="video/mp4"
								/>
								Your browser does not support the video tag.
							</video>
						</div>
					</ProjectOverlay>

					<DesignThumbnail
						imageSrc="./src/media/grit/grit_thumbnail.jpg"
						imageAlt="GRIT Logo"
						onClick={() => window.showOverlay("grit-overlay")}
					/>
					<ProjectOverlay
						id="grit-overlay"
						title="GRIT - Logo"
						onClose={() => window.hideOverlay("grit-overlay")}
					>
						<p>
							I started to see a lot of graphic design content on social media,
							and felt inspired to practice some new techniques. I wanted to try
							my hand at creating a wordmark for a logo from scratch - that is,
							by constructing the letters myself rather than using a
							pre-existing typeface. In order to do that, I created a grid
							system and a set of rules that each letter would follow. One rule
							(or guideline, really) was that each letter should have at least
							one segment where its outline extended past the corner.
						</p>
						<figure>
							<img
								class="img-height-220"
								src="./src/media/grit/grid_system.jpg"
								alt="Underlying grid structure of GRIT logo"
								loading="lazy"
							/>
						</figure>
						<p>
							In keeping with the theme suggested by the word ‘grit’, and again
							inspired by trends on social media, I worked with some texture
							assets to get an effect that I thought worked well.
						</p>
						<div class="centered-row">
							<figure>
								<img
									src="./src/media/grit/first_texture.jpg"
									alt="An early attempt at using texture for the GRIT logo"
									loading="lazy"
								/>
								<figcaption>Early attempt at incorporating texture</figcaption>
							</figure>
							<figure>
								<img
									src="./src/media/grit/grit_thumbnail.jpg"
									alt="Final GRIT logo"
									loading="lazy"
								/>
								<figcaption>Final result</figcaption>
							</figure>
						</div>
					</ProjectOverlay>

					<DesignThumbnail
						imageSrc="./src/media/nmg/nmg_thumbnail.png"
						imageAlt="New Matrix Group Logo"
						onClick={() => window.showOverlay("nmg-overlay")}
					/>
					<ProjectOverlay
						id="nmg-overlay"
						title="New Matrix Group - Logo"
						onClose={() => window.hideOverlay("nmg-overlay")}
					>
						<p>
							While helping build some of the underlying data pipelines for a
							business intelligence startup, I decided to take a bit of time to
							create a logo for the company, since we did not have one yet. I
							wanted to match the tone of our pitches to potential clients. Many
							of the clients were mid-size clothing retailers that had been
							using the same business intelligence solutions for many years, so
							we wanted to emphasize that with our solutions, we could provide
							easier access and deeper insights into a company’s accounting and
							sales statistics.
						</p>
						<div class="centered-column contain-img-height-180">
							<img
								src="./src/media/nmg/nmg_thumbnail.png"
								alt="New Matrix Group logo, condensed"
								loading="lazy"
							/>
							<img
								src="./src/media/nmg/nmg_large_with_bg.png"
								alt="New Matrix Group logo, extended"
								loading="lazy"
							/>
						</div>
					</ProjectOverlay>

					<DesignThumbnail
						imageSrc="./src/media/cupcakes_thumbnail.png"
						imageAlt="Afternoon Cupcakes Logo"
						onClick={() => window.showOverlay("cupcakes-overlay")}
					/>
					<ProjectOverlay
						id="cupcakes-overlay"
						title="Afternoon Cupcakes - Logo"
						onClose={() => window.hideOverlay("cupcakes-overlay")}
					>
						<p>
							As an exercise, I challenged myself to make a logo for a bakery,
							and came up with this. I did this back in high school, but I still
							think it's cute. I remember being pleased with the font at the
							time (Abril Fatface if you're curious).
						</p>
						<div class="centered-column contain-img-height-440">
							<img
								src="./src/media/cupcakes_thumbnail.png"
								alt="Afternoon Cupcakes Logo"
								loading="lazy"
							/>
						</div>
					</ProjectOverlay>
				</div>
			</section>
			<section id="programming-work-section">
				<div class="section-heading">
					<h2>Programming Work</h2>
				</div>
				<ProgrammingCard
					onClick={() => window.showOverlay("midi-overlay")}
					title="MIDI Signal Augmenter"
					description="A program for turning single note presses into chords and arpeggios."
					imgSrc="./src/media/midi_thumbnail.png"
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
						This was a project I did for an elective in college on computer
						music. Using this program I wrote in&nbsp;
						<a href="https://supercollider.github.io/" target="_blank">
							SuperCollider
						</a>
						, musicians can play notes on any common peripheral controller, and
						have transformations applied to the&nbsp;
						<a href="https://en.wikipedia.org/wiki/MIDI" target="_blank">
							MIDI
						</a>
						&nbsp;signals which can cause a number of effects, such as creating
						chords from each note press, or automatically playing a held chord
						as an arpeggio.
					</p>
					<p>
						Chord mode and Arpeggio mode can each be toggled independently. When
						only chord mode is on, single note presses result in a whole chord
						being output. Users can choose between major, minor, diminished,
						major 7th, minor 7th, dominant 7th, sus2, sus4, and augmented
						chords.
					</p>
					<p>
						When only arpeggio mode is on, any notes held down will play one
						after the other in a loop. There are several patterns to choose
						from:
						<li>
							Upward: plays notes starting from lowest to highest before looping
						</li>
						<li>
							Downward: plays notes starting from highest to lowest before
							looping
						</li>
						<li>Random: plays notes in completely random order</li>
						<li>
							Random Walk: plays a random note, then randomly plays either the
							next highest note or next lowest note
						</li>
						<li>
							Ping Pong: plays notes starting from lowest to highest, then
							highest to lowest, and repeats
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
						like to build these things myself, and to learn what sort of
						technical challenges I might be taking for granted under the hood.
					</p>
				</ProjectOverlay>

				<ProgrammingCard
					onClick={() => window.showOverlay("alien-egg-overlay")}
					title='"Alien Egg" Sculpture'
					description="An interactive sculpture built with clay, ultrasonic sensors, and sleep deprivation."
					imgSrc="./src/media/alien_egg/brain_rock_thumbnail.png"
					imgAlt="Alien Egg sculpture"
				/>
				<ProjectOverlay
					id="alien-egg-overlay"
					title='"Alien Egg" Sculpture'
					onClose={() => window.hideOverlay("alien-egg-overlay")}
				>
					<p>
						I built this sculpture for an exhibition of artwork by Yale college
						seniors. I had no prior experience with any of the materials I used
						- I had never made anything with clay, and more technically
						challenging, I had never built a physical circuit before or had any
						experience with&nbsp;
						<a href="https://en.wikipedia.org/wiki/Arduino" target="_blank">
							Arduinos
						</a>
						.
					</p>
					<p>
						I went into the project a bit unsure of what I was going to build,
						but after a few sessions at the pottery studio, and several
						all-nighters at the maker-space on campus, the project started to
						take literal and conceptual shape.
					</p>
					<p>
						What I ended up making was a small clay vessel, about the size of a
						football, with many holes along the surface. I crammed a bunch of
						LED strips inside, connected via an Arduino circuit to an ultrasonic
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
							class="img-height-420"
							src="./src/media/alien_egg/wide_angle.jpg"
							alt="Wide angle shot of the Alien Egg sculpture in the gallery"
						/>
						<figcaption>The egg sitting in its enclave</figcaption>
					</figure>
					<p>
						I placed the sculpture on a pedestal, tucked away under the
						staircase in one of the showrooms of the gallery. As members of the
						audience approached the sculpture, the ultrasonic sensor would read
						the distance to the nearest person. This information was fed through
						the circuit such that as people approached the sculpture, the LED
						strips would shine brighter, and as they moved away, the lights
						would dim.
					</p>
					<div class="centered-column contain-img-height-220">
						<img
							src="./src/media/alien_egg/close_up.jpg"
							alt="Close-up shot of Alien Egg sculpture"
						/>
						<video preload="none" width="640" height="360" controls loop muted>
							<source
								src="./src/media/alien_egg/demonstration.mp4"
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
						<figcaption>Video of the sculpture in action</figcaption>
					</div>
				</ProjectOverlay>

				<ProgrammingCard
					onClick={() => window.showOverlay("high-noon-overlay")}
					title="High Noon"
					description="A very simple 3D platformer I built as a way of teaching myself the Unity engine."
					imgSrc="./src/media/high_noon/high_noon_thumbnail.png"
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
						<a
							href="https://github.com/material-kish/high-noon"
							target="_blank"
						>
							https://github.com/material-kish/high-noon
						</a>
					</p>
					<div class="centered-column mt">
						<img
							loading="lazy"
							src="./src/media/high_noon/cowboy_1.jpg"
							alt="Screenshot from High Noon 1/3"
						/>
						<img
							loading="lazy"
							src="./src/media/high_noon/cowboy_2.jpg"
							alt="Screenshot from High Noon 2/3"
						/>
						<img
							loading="lazy"
							src="./src/media/high_noon/cowboy_3.jpg"
							alt="Screenshot from High Noon 3/3"
						/>
					</div>
				</ProjectOverlay>
			</section>
			<div class="section-heading">
				<h2>Contact</h2>
			</div>
			<div class="contact-section mb">
				<a
					href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com"
					target="_blank"
					class="contact-detail"
				>
					<i class="fa-regular fa-envelope"></i>
					<h3>ja&#99;obfeitm&#97;nn&#64;gmail&#46;com</h3>
				</a>
				<a
					href="https://www.instagram.com/i.love.kishka/"
					target="_blank"
					class="contact-detail"
				>
					<i class="fa-brands fa-instagram"></i>
					<h3>@i.love.kishka</h3>
				</a>
				<a
					href="https://github.com/material-kish"
					target="_blank"
					class="contact-detail"
				>
					<i class="fa-brands fa-github"></i>
					<h3>github.com/material-kish</h3>
				</a>
			</div>
			<script type="module" src="/src/main.js"></script>
		</>
	);
}

export default App;
