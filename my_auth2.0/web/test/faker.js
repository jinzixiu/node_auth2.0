var faker = require('faker');
//设置语言为简体中文

faker.locale = 'zh_CN';

var dataArticles = [];
var ARTICLE_NUM = 100;

//生成文章列表

for(var i= 0;i<ARTICLE_NUM;i++){
    dataArticles.push({
        id:faker.random.uuid(),
        author:faker.name.findName(),
        title:faker.lorem.sentence(),
        createdAt:faker.database.past(),
        content:faker.lorem.paragreaphs(10)
    });
}

console.log(faker.random.uuid())
console.log(faker.name.findName())
console.log(faker.lorem.sentence())
console.log(faker.date.past())
console.log(faker.lorem.paragreaphs(10))