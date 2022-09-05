<script>
	import Juxtapose from '$lib/Juxtapose.svelte';

	/** @type {Number} */
	let figureWidth = 300;

	const site = {
		title: 'svelte-juxtapose',
		description: 'Easily juxtapose two blocks with a interactive slider.',
		keywords: ['svelte,image compare,juxtapose,photography,web development']
	};
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="title" content={site.title} />
	<meta name="description" content={site.description} />
	<meta name="author" content={site.title} />
	<meta name="keywords" content={site.keywords.join(',')} />

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="en" />
	<meta name="robots" content="index,follow" />
</svelte:head>

<main>
	<nav>
		<a
			href="https://github.com/sawyerclick/svelte-juxtapose"
			rel="external"
			aria-label="GitHub"
			title="GitHub"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-github"
			>
				<path
					d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
				/>
			</svg>
		</a>
	</nav>

	<header>
		<h1 itemprop="name">svelte-juxtapose</h1>
		<p itemprop="description">Easily juxtapose two blocks with a interactive slider.</p>
		<p>
			By <a href="https://github.com/SawyerClick" target="_blank" itemprop="author">Sawyer Click</a>
		</p>
	</header>

	<section id="usage">
		<header>
			<h2>Usage</h2>
		</header>

		<section id="slots">
			<h3>Slots</h3>

			<table>
				<thead>
					<th>Name</th>
					<th>Description</th>
				</thead>
				<tbody>
					<tr>
						<td>Before</td>
						<td>The "bottom" layer. Completely covered while slider is at 100%.</td>
					</tr>
					<tr>
						<td>After</td>
						<td>The "top" layer. Completely covered while slider is at 0%.</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section id="props">
			<h3>Props</h3>

			<table>
				<thead>
					<th>Name</th>
					<th>Default</th>
					<th>Description</th>
				</thead>
				<tbody>
					<tr>
						<td>width</td>
						<td>600px</td>
						<td>
							The width of the container. Should ideally be set by using <code
								>bind:clientWidth</code
							> on the parent element.
						</td>
					</tr>
					<tr>
						<td>height</td>
						<td>300px</td>
						<td>
							The height of the container. Both blocks should have a similar aspect ratio so that
							this calculation could simply be <code>9/16 &times; width</code>.
						</td>
					</tr>
					<tr>
						<td>class</td>
						<td>""</td>
						<td>Classes to apply to the container element.</td>
					</tr>
					<tr>
						<td>style</td>
						<td><code>undefined</code></td>
						<td>Styles to apply to the container element.</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section id="events">
			<h3>Events</h3>

			<table>
				<thead>
					<th>Name</th>
					<th>Properties</th>
					<th>Description</th>
				</thead>
				<tbody>
					<tr>
						<td>on:start</td>
						<td>active, position, event</td>
						<td> Fires when the slider has a mousedown or touchstart event </td>
					</tr>
					<tr>
						<td>on:move</td>
						<td>active, position, event</td>
						<td>
							Fires when the slider has been moved. Movement is limited to 0-100% of the container
							width.
						</td>
					</tr>
					<tr>
						<td>on:end</td>
						<td>active, position, event</td>
						<td>
							Fires when the window has a <code>mouseup</code> or <code>touchend</code> event, ending
							the movement.
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</section>

	<section id="simple">
		<header>
			<h2>Simple example</h2>
		</header>
		<figure bind:clientWidth={figureWidth}>
			<Juxtapose height={figureWidth / 2} width={figureWidth} --thumb-color="var(--accent)">
				<img
					slot="before"
					src="https://via.placeholder.com/600x300.png/d7d7d7/323232?text=Before"
					alt="Before"
				/>

				<img
					slot="after"
					src="https://via.placeholder.com/600x300.png/323232/ffffff?text=After"
					alt="After"
				/>
			</Juxtapose>
			<figcaption>
				A simple example of svelte-juxtapose featuring two image tags in the <a href="#slots"
					><b>before</b> and <b>after</b> slots</a
				>.
			</figcaption>
		</figure>
	</section>
</main>

<style>
	:root {
		--bg: #fcf9f6;
		--fg: #0c553f;
		--accent: #f4a520;
	}
	* {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		accent-color: var(--accent);
		color: var(--fg);
	}
	:global(body) {
		background-color: var(--bg);
	}
	main {
		max-width: 640px;
		margin: 0 auto;
		padding: 0 24px;
	}
	nav {
		position: fixed;
		top: 1.5rem;
		right: 0.5rem;
		background-color: var(--bg);
	}
	main > section {
		margin: 4rem auto;
	}
	main > section > section {
		margin: 2rem auto;
	}
	figure {
		width: 100%;
		margin: 0;
	}
	figcaption {
		margin-top: 0.5rem;
	}
	table {
		text-align: left;
		border-spacing: 8px 8px;
	}
	th {
		box-shadow: 0px 1px 0px var(--fg);
	}
	tr td:first-of-type {
		font-weight: bold;
	}
	code {
		font-style: italic;
		font-family: 'Courier New', Courier, monospace;
	}
</style>
