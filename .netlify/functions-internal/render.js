const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.ico","service-worker.js"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon"},
	_: {
		entry: {"file":"_app/immutable/start-12885125.js","imports":["_app/immutable/start-12885125.js","_app/immutable/chunks/index-5d9b827a.js","_app/immutable/chunks/singletons-c81f91f2.js","_app/immutable/chunks/index-f0c56288.js"],"stylesheets":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
