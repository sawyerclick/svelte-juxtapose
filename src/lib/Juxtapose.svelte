<script>
	import { createEventDispatcher } from 'svelte';
	import { spring } from 'svelte/motion';

	/** @type {Number} */
	export let width = 600;

	/** @type {Number} */
	export let height = 300;

	let classes = '';
	/** @type {String} */
	export { classes as class };

	/** @type {String|undefined} */
	export let style = undefined;

	/** @type {Number} */
	export let starting = 50;

	// /** @type {import('svelte/motion').spring} */
	const position = spring(starting);

	// /** @type {import('svelte').ComponentEvents} */
	const dispatch = createEventDispatcher();

	/** @type {Boolean} */
	let active;

	/** @type {Array.<Element>} */
	let images = [];

	/**
	 * @description slider is clicked
	 * @param {MouseEvent|TouchEvent} event
	 */
	const start = (event) => {
		event.preventDefault();
		active = true;
		dispatch('start', { event, active, position });
	};

	/**
	 * @description move the image slider to the given position
	 * @param {MouseEvent|TouchEvent|any} event
	 */
	const move = (event) => {
		if (!active) return;

		// respect touch events
		event = event?.changedTouches?.[0] ?? event;

		// x position of the after image
		const afterEl = images[1].getBoundingClientRect();

		const pos = event.pageX - afterEl.left - window.pageXOffset;

		// prevent slider from being outside of image

		position.set(Math.min(100, Math.max(0, (pos / width) * 100)));
		dispatch('move', { event, active, position });
	};

	/**
	 * @description slider no longer clicked
	 * @param {MouseEvent|TouchEvent} event
	 */
	const end = (event) => {
		active = false;
		dispatch('end', { event, active, position });
	};
</script>

<svelte:window on:mousemove={move} on:touchmove={move} on:mouseup={end} on:touchend={end} />

<div
	class="juxtapose-compare-container {classes}"
	class:active
	style:--height="{height}px"
	style:--width="{width}px"
	style:--position="{$position}%"
	{style}
>
	<div class="juxtapose-compare-image juxtapose-compare-before" bind:this={images[0]}>
		<slot name="before" position={$position} />
	</div>
	<div class="juxtapose-compare-slider" on:mousedown={start} on:touchstart={start} />
	<div class="juxtapose-compare-image juxtapose-compare-after" bind:this={images[1]}>
		<slot name="after" position={$position} />
	</div>
</div>

<style lang="postcss">
	.juxtapose-compare-container {
		--height: 600px;
		--width: 300px;
		--position: 50%;
		position: relative;
		user-select: none;
		height: var(--height);
		width: var(--width);
	}
	.juxtapose-compare-image {
		position: absolute;
		width: var(--width);
		height: auto;
		overflow: hidden;
	}
	.juxtapose-compare-image.juxtapose-compare-after {
		width: var(--position);
	}
	.juxtapose-compare-image :global(*) {
		display: block;
		height: var(--height);
		aspect-ratio: auto var(--width) / var(--height);
		object-fit: cover;
		object-position: left;
	}
	.juxtapose-compare-slider {
		position: absolute;
		top: calc(50% - var(--thumb-size, calc(var(--height) / 10)) / 2);
		left: calc(var(--position) - var(--thumb-size, calc(var(--height) / 10)) / 2);
		z-index: 10;
		cursor: ew-resize;
		width: var(--thumb-size, calc(var(--height) / 10));
		height: var(--thumb-size, calc(var(--height) / 10));
		background-color: var(--thumb-color, #000000);
		border-radius: 9999px;
		transform: scale(1);
		transition: transform ease-out 150ms;
	}
	.juxtapose-compare-container.active .juxtapose-compare-slider {
		transform: scale(1.25);
	}
</style>
