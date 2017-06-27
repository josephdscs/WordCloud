//var fs = require("fs");

var width = 1200,
    height = 800;

var leaderScale = d3.scale.linear().range([10, 60]);

var fill = d3.scale.category20();

/*fs.readFileSync('answersRes.json', 'utf8', function (data) {
    var obj = JSON.parse(data);
    var array = obj[0].relatedArticleDataList.map(function (x) {
            return {
                text: x.articleData.title,
                size: x.articleData.value
            };
        })
        .sort(function (a, b) {
            return d3.descending(a.size, b.size);
        })
        .slice(0, 100);

    console.log("aqui", array);

    leaderScale.domain([
        d3.min(array, function (d) {
            return d.size;
        }),
        d3.max(array, function (d) {
            return d.size;
        })
    ]);


    d3.layout.cloud().size([width, height])
        .words(array)
        .padding(5)
        .rotate(function () {
            return ~~(Math.random() * 1) * 90;
        })
        .font("Impact")
        .fontSize(function (d) {
            return leaderScale(d.size);
        })
        .on("end", draw)
        .start();

});*/

d3.tsv("hola2.tsv", function (data) {
    var leaders = data
        .filter(function (d) {
            return +d.value > 0;
        })
        .map(function (d) {
            return {
                text: d.title,
                size: +d.value
            };
        })
        .sort(function (a, b) {
            return d3.descending(a.size, b.size);
        })
        .slice(0, 100);

    leaderScale.domain([
        d3.min(leaders, function (d) {
            return d.size;
        }),
        d3.max(leaders, function (d) {
            return d.size;
        })
    ]);


    d3.layout.cloud().size([width, height])
        .words(leaders)
        .padding(5)
        .rotate(function () {
            return ~~(Math.random() * 1) * 90;
        })
        .font("Impact")
        .fontSize(function (d) {
            return leaderScale(d.size);
        })
        .on("end", draw)
        .start();

});

function draw(words) {
    d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function (d, i) {
            return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
            return d.text;
        });
}