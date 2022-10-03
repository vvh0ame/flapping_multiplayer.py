import requests
from time import time
from random import randint

class FlappingMultiplayer:
	def __init__(self):
		self.chat_api = "http://www.fakemon.net/chat"
		self.game_api = "http://www.browsergamer.net/fo"
		self.main_api = "http://www.flappingonline.com/fo"
		self.headers = {
			"user-agent": "libcurl-agent/1.0"
		}
		self.ii = None
		self.chat_version = "4.6"

	def auth_with_ii(self, ii: str):
		self.ii = ii
		return self.ii

	def get_country(self):
		return requests.get(
			f"{self.main_api}/country.php",
			headers=self.headers).text

	def get_level_rank(
			self,
			dv: int = 0,
			server_id: int = 1,
			mn: int = 1):
		return requests.get(
			f"{self.main_api}/level_rank.php?dv={dv}&sv={server_id}&ii={self.ii}&mn={mn}",
			headers=self.headers).text

	def get_level_info(
			self,
			id: int = 1,
			dv: int = 0,
			server_id: int = 1):
		return requests.get(
			f"{self.game_api}/level{id}.php?dv={dv}&sv={server_id}&ii={self.ii}",
			headers=self.headers).text

	def get_chat(
			self,
			chat_type: str = "all",
			dv: int = 0):
		return requests.get(
			f"{self.chat_api}/get_chat.php?c={chat_type}&v={self.chat_version}&dv={dv}",
			headers=self.headers).text

	def send_message(
			self,
			text: str,
			name: str,
			rk: int = 10000,
			d: int = 0,
			chat_type: str = "all",
			country_code: str = "us"):
		data = {
			"p": randint(0, 60000),
			"dt": time() * 1000,
			"ii": self.ii,
			"rk": rk,
			"c": chat_type,
			"t": text,
			"l": country_code,
			"d": d,
			"n": name,
			"v": self.chat_version
		}
		return requests.post(
			f"{self.chat_api}/ins_chat.php",
			data=data,
			headers=self.headers).status_code

	def rank_db(
			self,
			statistics: list,
			values: list):
		data = dict(zip(statistics, values))
			f"{self.game_api}/rankdb.php",
			data=data,
			headers=self.headers).text
	
	def insert_score(
			self,
			statistics: list,
			values: list):
		data = dict(zip(statistics, values))
		return requests.post(
			f"{self.game_api}/ins_sc.php",
			data=data,
			headers=self.headers).text
