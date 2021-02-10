/*
*    main.js
*    Mastering Data Visualization with D3.js
*    10.4 - Converting our code to OOP
*/

let lineChart1
let lineChart2
let lineChart3
let lineChart4

// time parsers/formatters
const parseTime = d3.timeParse("%d/%m/%Y")
const formatTime = d3.timeFormat("%d/%m/%Y")

// event listeners
$("#estacion-select").on("change", updateCharts)
$("#var-select").on("change", updateCharts)

// add jQuery UI slider
$("#date-slider").slider({
	range: true,
	max: parseTime("31/10/2017").getTime(),
	min: parseTime("12/5/2016").getTime(),
	step: 86400000, // one day
	values: [
		parseTime("12/5/2016").getTime(),
		parseTime("31/10/2017").getTime()
	],
	slide: (event, ui) => {
		$("#dateLabel1").text(formatTime(new date(ui.values[0])))
		$("#dateLabel2").text(formatTime(new date(ui.values[1])))
		updateCharts()
	}
})

d3.json("data/mybyke.json").then(data => {
	// prepare and clean data
	filteredData = {}
	Object.keys(data).forEach(estacion => {
		filteredData[estacion] = data[estacion]
			.filter(d => {
				return !(d["total"] == null)
			}).map(d => {
				d["total"] = Number(d["total"])
				d["temperatura"] = Number(d["temperatura"])
				d["sensacion"] = Number(d["sensacion"])
				d["date"] = parseTime(d["date"])
				return d
			})
	})

	lineChart1 = new LineChart("#chart-area1", "primavera")
	lineChart2 = new LineChart("#chart-area2", "verano")
	lineChart3 = new LineChart("#chart-area3", "otoño")
	lineChart4 = new LineChart("#chart-area4", "invierno")	
})

function updateCharts(){
	lineChart1.wrangleData()
	lineChart2.wrangleData()
	lineChart3.wrangleData()
	lineChart4.wrangleData()	
}