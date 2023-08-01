async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            //'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response;
}

let searchbox = document.getElementById('searchbox');
let results = document.getElementById('results');

searchbox.oninput = () => {
    let keyword = searchbox.value;
    // TODO: run this function is the search type changes
    let selectedOption = document.querySelector('input[name="searchtype"]:checked');
    let type = selectedOption.value;;

    postData(`/query/${type}/${keyword}`)
        .then(v => v.json())
        .then(json => {
            results.innerHTML = '';

            json.forEach((v, _) => {
                let name = v.id;

                let p = document.createElement('p');
                let a = document.createElement('a');
                let text = document.createTextNode(name);

                a.href = `/${type}/${name}`;

                a.appendChild(text);
                p.appendChild(a)
                results.appendChild(p);
            });
        });
}
