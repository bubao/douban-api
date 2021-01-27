/**
 * @description:
 * @author: bubao
 * @date: 2021-01-27 06:05:09
 * @last author: bubao
 * @last edit time: 2021-01-27 08:10:53
 */

const got = require("got");
const bookConfig = require("../../config/api").book;
const fs = require("fs").promises;
const cheerio = require("cheerio");

class Tag {
	constructor() {
		this.bookConfig = bookConfig;
	}

	static init() {
		if (!this.instance) {
			this.instance = new Tag();
		}
		return this.instance;
	}

	async allTags() {
		const response = await got(bookConfig.tag.index).catch(err =>
			err.response
		);
		console.log(response.body);
		const $ = cheerio.load(response.body + "");
		const tags = [];
		$(".tag-title-wrapper").each(function(index, element) {
			tags[index] = { name: element.attribs.name };
		});
		$(".tagCol tbody").each(function(index, element) {
			const data = [];
			element.children.forEach(function(child) {
				if (child.children !== undefined) {
					child.children.forEach(function(c) {
						if (c.name === "td") {
							data.push({
								href: bookConfig.index + c.children[0].attribs.href,
								name: c.children[0].children[0].data,
								count: /\((\d+)\)?/gi.exec(c.children[1].children[0].data)[1]
							});
						}
					});
				}
			});
			tags[index] = { ...tags[index], data };
		});
		return tags;
	}
}

module.exports = Tag;

const tag = new Tag();
tag.allTags().then(async response => {
	await fs.writeFile("./index1.json", JSON.stringify(response));
});

// (async () => {
// 	const body = await fs.readFile("./index.html");
// 	const $ = cheerio.load(body);

// })();
