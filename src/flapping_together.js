class FlappingTogether {
	constructor() {
		this.chatApi = "http://www.fakemon.net/chat"
		this.gameApi = "http://www.browsergamer.net/fo"
		this.mainApi = "http://www.flappingonline.com/fo"
		this.headers = {
			"user-agent": "libcurl-agent/1.0"
		}
		this.ii = null
		this.chatVersion = "4.6"
	}

	login_with_ii(ii) {
		this.ii = ii
	}

	async getCountry() {
		const response = await fetch(
			`${this.mainApi}/country.php`, {
				method: "GET",
				headers: this.headers
			})
		return response.text()
	}

	async getLevelRank(dv = 0, serverId = 1, mn = 1) {
		const response = await fetch(
			`${this.mainApi}/level_rank.php?dv=${dv}&sv=${serverId}&ii=${this.ii}&mn=${mn}`, {
				method: "GET",
				headers: this.headers
			})
		return response.text()
	}

	async getLevelInfo(id = 1, dv = 0, serverId = 1) {
		const response = await fetch(
			`${this.gameApi}/level${id}.php?dv=${dv}&sv=${serverId}&ii=${this.ii}`, {
				method: "GET",
				headers: this.headers
			})
		return response.text()
	}

	async getChat(chatType = "all", dv = 0) {
		const response = await fetch(
			`${this.chatApi}/get_chat.php?c=${chatType}&v=${this.chatVersion}&dv=${dv}`, {
				method: "GET",
				headers: this.headers
			})
		return response.text()
	}

	async send_message(text, name, rk = 10000, d = 0, chatType = "all", countryCode = "us") {
		const response = await fetch(
			`${this.chatApi}/ins_chat.php`, {
				method: "GET",
				body: JSON.stringify({
					p: Math.floor(Math.random() * 60001),
					dt: Date.now(),
					ii: this.ii,
					c: chatType,
					t: text,
					l: countryCode,
					d: d,
					n: name,
					v: this.chatVersion
				}),
				headers: this.headers
			})
		return response.status
	}

	async rankDb(statistics, values) {
		const body = Object.fromEntries(zip(statistics, values))
		const response = await fetch(
			`${this.gameApi}/rankdb.php`, {
				method: "POST",
				body: JSON.stringify(body),
				headers: this.headers
			})
		return response.text()
	}

	async insertScore(statistics, values) {
		const body = Object.fromEntries(zip(statistics, values))
		const response = await fetch(
			`${this.gameApi}/ins_sc.php`, {
				method: "POST",
				body: JSON.stringify(body),
				headers: this.headers
			})
		return response.text()
	}
}

module.exports = {FlappingTogether}
