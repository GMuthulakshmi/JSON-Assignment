var readline=require('readline');
var fs=require('fs');
var lineReader=readline.createInterface({input:fs.createReadStream('G20.csv'),});
var i=0;
var country;
var population_13;
var country_index;
var population_index;
var population_Array=[];
var gdp_13,gdp_10;
var gdp_index,gdp_index10;
var gdp_Array=[];
var pp_13;
var purchasing_chart=[];
var pp_index;
var purchasing_Array=[];
var population_10;
var population_index10;
var pp_10;
var population_growth,purchasing_growth;
var growth_Array=[];
var asiaContinent=['India','China','Japan','Indonesia'];
var europeContinent=['France','Russia','Germany','Italy'];
var northAmericaContinent=['Mexico','Canada','USA'];
var southAmericaContinent=['Saudi Arabia', 'Republic of Korea', 'Turkey'];
var australiaContinent=['United Kingdom','Australia'];
var africaContinent=['South Africa','Argentina','Brazil'];
var aggregate_Array=[];
var continentwisePopulation=[0,0,0,0,0,0];
var continentwiseGDP=[0,0,0,0,0,0];
var continents=["africa","europe","northAmerica","southAmerica","australia","asia"];
var population_limit,gdp_limit;
var index_population,index_gdp;

	function population_chart(country,population_13)
{
	this.country=country;
	this.population_13=population_13;
}
function gdp_chart(country,gdp_13)
{
	this.country=country;
	this.gdp_13=gdp_13;
}
function purchasing_chat(country,pp_13)
{
	this.country=country;
	this.pp_13=pp_13;
}
function growth_chat(country,population_growth,purchasing_growth)
{
	this.country=country;
	this.population_growth=population_growth;
	this.purchasing_growth=purchasing_growth;
}
function aggregate(continents, continentwisePopulation, continentwiseGDP) {
    this.continent = continents;
    this.population = continentwisePopulation;
    this.GDP = continentwiseGDP;

}
lineReader.on('line',function(line)
{
	var record=line.trim().split(",");

	if(i<1)
	{
		country_index=record.indexOf('Country Name');
		console.log(country_index);
		population_index=record.indexOf('Population (Millions) 2013');
		gdp_index=record.indexOf('GDP Billions (USD) 2013');
		gdp_index10=record.indexOf('GDP Billions (USD) 2010');
		pp_index=record.indexOf('Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013');
    population_index10=record.indexOf('Population (Millions) 2010');
    pp_index10=record.indexOf('Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2010');
		i++;
	}
	else
	{
			country=record[country_index];

		population_13=record[population_index];
		population_10=record[population_index10];
		gdp_13=record[gdp_index];
		gdp_10=record[gdp_index10];
		pp_13=record[pp_index];
		pp_10=record[pp_index10];

		population_Array.push(new population_chart(country,population_13));
		gdp_Array.push(new gdp_chart(country,gdp_13));
		purchasing_Array.push(new purchasing_chat(country,pp_13));
		population_Array.sort(function(a,b)
		{
			return parseFloat(b.population_13)-parseFloat(a.population_13);
		});
		gdp_Array.sort(function(a,b)
		{
			return parseFloat(b.gdp)-parseFloat(a.gdp);
		});
		purchasing_Array.sort(function(a,b)
		{
			return parseFloat(b.pp_13)-parseFloat(a.pp_13);
		});
		population_growth=(parseFloat(population_13)*1000)-(parseFloat(population_10)*1000);
		purchasing_growth=parseFloat(pp_13)-parseFloat(pp_10);

	    growth_Array.push(new growth_chat(country,population_growth,purchasing_growth));

  index_population=parseInt(population_index10);
	  index_gdp=parseInt(gdp_index10);

	population_limit=population_index10+parseInt(6);
	gdp_limit=gdp_index10+parseInt(6);
	//console.log(index_population);
	//console.log(population_limit);
	//console.log(index_gdp);
	//console.log(gdp_limit);
	for (index =index_population; index < population_limit; index++) {
							 if (africaContinent.includes(country))
							 {
									 continentwisePopulation[0] = parseFloat(continentwisePopulation[0]) + parseFloat(record[index_population]);

							 } else if (europeContinent.includes(country)) {
									 continentwisePopulation[1] = parseFloat(continentwisePopulation[1]) + parseFloat(record[index_population]);
							 } else if (northAmericaContinent.includes(country)) {
									 continentwisePopulation[2] = parseFloat(continentwisePopulation[2]) + parseFloat(record[index_population]);

							 } else if (southAmericaContinent.includes(country)) {
									 continentwisePopulation[3] = parseFloat(continentwisePopulation[3]) + parseFloat(record[index_population]);

							 } else if (australiaContinent.includes(country)) {
									 continentwisePopulation[4] = parseFloat(continentwisePopulation[4]) + parseFloat(record[index_population]);

							 } else if (asiaContinent.includes(country)) {
								 		continentwisePopulation[5] = parseFloat(continentwisePopulation[5]) + parseFloat(record[index_population]);

							 }
					 }

                for (index =index_gdp; index < gdp_limit; index++) {
							 if (africaContinent.includes(country)) {
									 //continent = continents[0];
									 continentwiseGDP[0] = parseFloat(continentwiseGDP[0]) + parseFloat(record[index_gdp]);
              } else
							 if (europeContinent.includes(country)) {
									 //continent = continents[1];
									 continentwiseGDP[1] = parseFloat(continentwiseGDP[1]) + parseFloat(record[index_gdp]);

							 } else if (northAmericaContinent.includes(country)) {
									 //continent = continents[2];
									 continentwiseGDP[2] = parseFloat(continentwiseGDP[2]) + parseFloat(record[index_gdp]);

							 } else if (southAmericaContinent.includes(country)) {
									 //continent = continents[3];
									 continentwiseGDP[3] = parseFloat(continentwiseGDP[3]) + parseFloat(record[index_gdp]);

							 } else if (australiaContinent.includes(country)) {

									// continent = continents[4];
									 continentwiseGDP[4] = parseFloat(continentwiseGDP[4]) + parseFloat(record[index_gdp]);

							 } else if (asiaContinent.includes(country)) {
									 //continent = continents[5];
									 continentwiseGDP[5] = parseFloat(continentwiseGDP[5]) + parseFloat(record[index_gdp]);

							 }
}
					 }
				 });
				 lineReader.on("close",function()
				 {
					 for(arr = 0; arr <6; arr++)
				{
 aggregate_Array.push(new aggregate(continents[arr], continentwisePopulation[arr], continentwiseGDP[arr]));

			 }


 fs.writeFileSync("json/aggregate.json", JSON.stringify(aggregate_Array), encoding = "utf8");
fs.writeFileSync("json/population.json",JSON.stringify(population_Array),encoding="UTF8");
fs.writeFileSync("json/gdp.json",JSON.stringify(gdp_Array),encoding="UTF8");
fs.writeFileSync("json/purchasing.json",JSON.stringify(purchasing_Array),encoding="UTF8");
fs.writeFileSync("json/growth.json",JSON.stringify(growth_Array),encoding="UTF8");
				 });
