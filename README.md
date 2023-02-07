# Discord Bot Site Checker

Send __HTTP Status Code__ and __Screenshot__ on a Discord server.

> Developed and tested on NodeJS _18.8.0_ (and _NPM 8.18.0_)

### Install
Run :
```bash
make install
```

And set up :
- Your bot token in ``config/token.txt``
- Your site url in ``config/url.txt``
- Your discord channel in ``config/channel.txt``

And run :
```bash
make check
```
### Dependencies
- axios ^1.3.2,
- discord.js ^14.7.1
- puppeteer ^19.6.3
