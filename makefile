set-up:
	mkdir -p screenshot
	mkdir -p config
	touch config/token.txt
	touch config/url.txt
	touch config/channel.txt
	npm install

	@echo "\n-----------------------"
	@echo "Play : echo YOUR_TOKEN > config/token.txt"
	@echo "Play : echo YOUR_SITE_URL > config/url.txt"
	@echo "Play : echo YOUR_CHANNEL_NAME > config/channel.txt"
	@echo "----------------------- \n"

check-it:
	node index.js