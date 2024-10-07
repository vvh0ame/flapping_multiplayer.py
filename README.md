# flapping_together.js
Mobile-API for [Flapping Together](https://play.google.com/store/apps/details?id=net.havana24.flappingtogetheronline) mobile game

## Example
```JavaScript
async function main() {
	const { FlappingTogether } = require("./flapping_together.js")
	const flappingTogether = new FlappingTogether()
  flappingTogether.login_with_ii("ii")
}

main()
```

