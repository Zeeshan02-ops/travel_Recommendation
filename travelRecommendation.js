document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', clearSearch);

async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Zeeshan02-ops/my_reposit/refs/heads/master/index.json', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

async function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');


    resultsDiv.innerHTML = '';


    const data = await fetchData();

    debugger;
    var filteredData = data.countries.filter(item => {
        return item.name.toLowerCase().includes(searchInput);
    });
    if (filteredData.length==0) {
        filteredData = data.temples.filter(item => {
            return item.name.toLowerCase().includes(searchInput);
        });
    }
    if (filteredData==0) {
        filteredData = data.beaches.filter(item => {
            return item.name.toLowerCase().includes(searchInput);
        });
    }
    if (filteredData==0) {
        for(let q=0;q<data.countries.length;q++)
        {
            if(filteredData==0)
            {
                filteredData = data.countries[q].cities.filter(item => {
                    return item.name.toLowerCase().includes(searchInput);
                });
            }
            else{
                break;
            }
        }
        
    }



    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const div = document.createElement('div');
            let innerHTML = '<h3>' + item.name + '</h3><br>';
            innerHTML += '<ul>';
            if (item.cities) {
                for (let a = 0; a < item.cities.length; a++) {
                    innerHTML += '<li>' + item.cities[a].name + '  <img height="300px" src="' + item.cities[a].imageUrl + '"><br>' + item.cities[a].description + '</li>';
                }
            }
            else
            {
                innerHTML += '<br>' + item.name + '  <img height="300px" src="' + item.imageUrl + '"><br>' + item.description;
            }
            innerHTML += '</ul>'
            div.innerHTML = innerHTML;
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.textContent = 'No results found.';
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}