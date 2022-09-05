var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Page
});
module.exports = __toCommonJS(stdin_exports);
var import_chunks = require("../../chunks/index.js");
var import_index2 = require("../../chunks/index2.js");
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = (0, import_index2.w)(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = (0, import_chunks.d)();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = (0, import_chunks.d)();
      cancel_task = false;
      task = (0, import_chunks.l)((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const Juxtapose_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".juxtapose-compare-container.svelte-p0c8vo.svelte-p0c8vo{--height:600px;--width:300px;--position:50%;position:relative;user-select:none;height:var(--height);width:var(--width)}.juxtapose-compare-image.svelte-p0c8vo.svelte-p0c8vo{position:absolute;width:var(--width);height:auto;overflow:hidden}.juxtapose-compare-image.juxtapose-compare-after.svelte-p0c8vo.svelte-p0c8vo{width:var(--position)}.juxtapose-compare-image.svelte-p0c8vo *{display:block;height:var(--height);aspect-ratio:auto var(--width) / var(--height);object-fit:cover;object-position:left}.juxtapose-compare-slider.svelte-p0c8vo.svelte-p0c8vo{position:absolute;top:calc(50% - var(--thumb-size, calc(var(--height) / 10)) / 2);left:calc(var(--position) - var(--thumb-size, calc(var(--height) / 10)) / 2);z-index:10;cursor:ew-resize;width:var(--thumb-size, calc(var(--height) / 10));height:var(--thumb-size, calc(var(--height) / 10));background-color:var(--thumb-color, #000000);border-radius:9999px;transform:scale(1);transition:transform ease-out 150ms}.juxtapose-compare-container.active.svelte-p0c8vo .juxtapose-compare-slider.svelte-p0c8vo{transform:scale(1.25)}",
  map: null
};
const Juxtapose = (0, import_chunks.c)(($$result, $$props, $$bindings, slots) => {
  let $position, $$unsubscribe_position;
  let { width = 600 } = $$props;
  let { height = 300 } = $$props;
  let { class: classes = "" } = $$props;
  let { style = void 0 } = $$props;
  const position = spring(50);
  $$unsubscribe_position = (0, import_chunks.b)(position, (value) => $position = value);
  (0, import_chunks.f)();
  let images = [];
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$1);
  $$unsubscribe_position();
  return `

<div class="${[
    "juxtapose-compare-container " + (0, import_chunks.e)(classes, true) + " svelte-p0c8vo",
    ""
  ].join(" ").trim()}"${(0, import_chunks.h)((0, import_chunks.i)((0, import_chunks.e)(style, true), {
    "--height": `${height}px`,
    "--width": `${width}px`,
    "--position": `${$position}%`
  }))}><div class="${"juxtapose-compare-image juxtapose-compare-before svelte-p0c8vo"}"${(0, import_chunks.j)("this", images[0], 0)}>${slots.before ? slots.before({ position: $position }) : ``}</div>
	<div class="${"juxtapose-compare-slider svelte-p0c8vo"}"></div>
	<div class="${"juxtapose-compare-image juxtapose-compare-after svelte-p0c8vo"}"${(0, import_chunks.j)("this", images[1], 0)}>${slots.after ? slots.after({ position: $position }) : ``}</div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--bg:#fcf9f6;--fg:#0c553f;--accent:#f4a520}.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,\n			'Open Sans', 'Helvetica Neue', sans-serif;accent-color:var(--accent);color:var(--fg)}body{background-color:var(--bg)}main.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{max-width:640px;margin:0 auto;padding:0 24px}nav.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{position:fixed;top:1.5rem;right:0.5rem;background-color:var(--bg)}main.svelte-1usq2vo>section.svelte-1usq2vo.svelte-1usq2vo{margin:4rem auto}main.svelte-1usq2vo>section.svelte-1usq2vo>section.svelte-1usq2vo{margin:2rem auto}figure.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{width:100%;margin:0}figcaption.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{margin-top:0.5rem}table.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{text-align:left;border-spacing:8px 8px}th.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{box-shadow:0px 1px 0px var(--fg)}tr.svelte-1usq2vo td.svelte-1usq2vo.svelte-1usq2vo:first-of-type{font-weight:bold}code.svelte-1usq2vo.svelte-1usq2vo.svelte-1usq2vo{font-style:italic;font-family:'Courier New', Courier, monospace}",
  map: null
};
const Page = (0, import_chunks.c)(($$result, $$props, $$bindings, slots) => {
  let figureWidth = 300;
  const site = {
    title: "svelte-juxtapose",
    description: "Easily juxtapose two blocks with a interactive slider.",
    keywords: ["svelte,image compare,juxtapose,photography,web development"]
  };
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>${(0, import_chunks.e)(site.title)}</title>`, ""}<meta name="${"title"}"${(0, import_chunks.j)("content", site.title, 0)} class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds"><meta name="${"description"}"${(0, import_chunks.j)("content", site.description, 0)} class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds"><meta name="${"author"}"${(0, import_chunks.j)("content", site.title, 0)} class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds"><meta name="${"keywords"}"${(0, import_chunks.j)("content", site.keywords.join(","), 0)} class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds"><meta http-equiv="${"Content-Type"}" content="${"text/html; charset=utf-8"}" class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds"><meta http-equiv="${"Content-Language"}" content="${"en"}" class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds"><meta name="${"robots"}" content="${"index,follow"}" class="${"svelte-1usq2vo"}" data-svelte="svelte-cp13ds">`, ""}

<main class="${"svelte-1usq2vo"}"><nav class="${"svelte-1usq2vo"}"><a href="${"https://github.com/sawyerclick/svelte-juxtapose"}" rel="${"external"}" aria-label="${"GitHub"}" title="${"GitHub"}" class="${"svelte-1usq2vo"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"feather feather-github svelte-1usq2vo"}"><path d="${"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}" class="${"svelte-1usq2vo"}"></path></svg></a></nav>

	<header class="${"svelte-1usq2vo"}"><h1 itemprop="${"name"}" class="${"svelte-1usq2vo"}">svelte-juxtapose</h1>
		<p itemprop="${"description"}" class="${"svelte-1usq2vo"}">Easily juxtapose two blocks with a interactive slider.</p>
		<p class="${"svelte-1usq2vo"}">By <a href="${"https://github.com/SawyerClick"}" target="${"_blank"}" itemprop="${"author"}" class="${"svelte-1usq2vo"}">Sawyer Click</a></p></header>

	<section id="${"usage"}" class="${"svelte-1usq2vo"}"><header class="${"svelte-1usq2vo"}"><h2 class="${"svelte-1usq2vo"}">Usage</h2></header>

		<section id="${"slots"}" class="${"svelte-1usq2vo"}"><h3 class="${"svelte-1usq2vo"}">Slots</h3>

			<table class="${"svelte-1usq2vo"}"><thead class="${"svelte-1usq2vo"}"><th class="${"svelte-1usq2vo"}">Name</th>
					<th class="${"svelte-1usq2vo"}">Description</th></thead>
				<tbody class="${"svelte-1usq2vo"}"><tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">Before</td>
						<td class="${"svelte-1usq2vo"}">The &quot;bottom&quot; layer. Completely covered while slider is at 100%.</td></tr>
					<tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">After</td>
						<td class="${"svelte-1usq2vo"}">The &quot;top&quot; layer. Completely covered while slider is at 0%.</td></tr></tbody></table></section>

		<section id="${"props"}" class="${"svelte-1usq2vo"}"><h3 class="${"svelte-1usq2vo"}">Props</h3>

			<table class="${"svelte-1usq2vo"}"><thead class="${"svelte-1usq2vo"}"><th class="${"svelte-1usq2vo"}">Name</th>
					<th class="${"svelte-1usq2vo"}">Default</th>
					<th class="${"svelte-1usq2vo"}">Description</th></thead>
				<tbody class="${"svelte-1usq2vo"}"><tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">width</td>
						<td class="${"svelte-1usq2vo"}">600px</td>
						<td class="${"svelte-1usq2vo"}">The width of the container. Should ideally be set by using <code class="${"svelte-1usq2vo"}">bind:clientWidth</code> on the parent element.
						</td></tr>
					<tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">height</td>
						<td class="${"svelte-1usq2vo"}">300px</td>
						<td class="${"svelte-1usq2vo"}">The height of the container. Both blocks should have a similar aspect ratio so that
							this calculation could simply be <code class="${"svelte-1usq2vo"}">9/16 \xD7 width</code>.
						</td></tr>
					<tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">class</td>
						<td class="${"svelte-1usq2vo"}">&quot;&quot;</td>
						<td class="${"svelte-1usq2vo"}">Classes to apply to the container element.</td></tr>
					<tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">style</td>
						<td class="${"svelte-1usq2vo"}"><code class="${"svelte-1usq2vo"}">undefined</code></td>
						<td class="${"svelte-1usq2vo"}">Styles to apply to the container element.</td></tr></tbody></table></section>

		<section id="${"events"}" class="${"svelte-1usq2vo"}"><h3 class="${"svelte-1usq2vo"}">Events</h3>

			<table class="${"svelte-1usq2vo"}"><thead class="${"svelte-1usq2vo"}"><th class="${"svelte-1usq2vo"}">Name</th>
					<th class="${"svelte-1usq2vo"}">Properties</th>
					<th class="${"svelte-1usq2vo"}">Description</th></thead>
				<tbody class="${"svelte-1usq2vo"}"><tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">on:start</td>
						<td class="${"svelte-1usq2vo"}">active, position, event</td>
						<td class="${"svelte-1usq2vo"}">Fires when the slider has a mousedown or touchstart event </td></tr>
					<tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">on:move</td>
						<td class="${"svelte-1usq2vo"}">active, position, event</td>
						<td class="${"svelte-1usq2vo"}">Fires when the slider has been moved. Movement is limited to 0-100% of the container
							width.
						</td></tr>
					<tr class="${"svelte-1usq2vo"}"><td class="${"svelte-1usq2vo"}">on:end</td>
						<td class="${"svelte-1usq2vo"}">active, position, event</td>
						<td class="${"svelte-1usq2vo"}">Fires when the window has a <code class="${"svelte-1usq2vo"}">mouseup</code> or <code class="${"svelte-1usq2vo"}">touchend</code> event, ending
							the movement.
						</td></tr></tbody></table></section></section>

	<section id="${"simple"}" class="${"svelte-1usq2vo"}"><header class="${"svelte-1usq2vo"}"><h2 class="${"svelte-1usq2vo"}">Simple example</h2></header>
		<figure class="${"svelte-1usq2vo"}"><div style="display: contents; --thumb-color:${"var(--accent)"};">${(0, import_chunks.v)(Juxtapose, "Juxtapose").$$render(
    $$result,
    {
      height: figureWidth / 2,
      width: figureWidth
    },
    {},
    {
      after: () => {
        return `<img slot="${"after"}" src="${"https://via.placeholder.com/600x300.png/323232/ffffff?text=After"}" alt="${"After"}" class="${"svelte-1usq2vo"}">`;
      },
      before: () => {
        return `<img slot="${"before"}" src="${"https://via.placeholder.com/600x300.png/d7d7d7/323232?text=Before"}" alt="${"Before"}" class="${"svelte-1usq2vo"}">`;
      }
    }
  )}</div>
			<figcaption class="${"svelte-1usq2vo"}">A simple example of svelte-juxtapose featuring two image tags in the <a href="${"#slots"}" class="${"svelte-1usq2vo"}"><b class="${"svelte-1usq2vo"}">before</b> and <b class="${"svelte-1usq2vo"}">after</b> slots</a>.
			</figcaption></figure></section>
</main>`;
});
