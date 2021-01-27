/**
 * @description: 
 * @author: bubao
 * @date: 2021-01-27 06:08:14
 * @last author: bubao
 * @last edit time: 2021-01-27 06:08:27
 */

module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "subject-empty": [0, "always"],
        "type-empty": [0, "always"]
    }
};
