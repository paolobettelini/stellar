async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response;
}

let searchbox = document.getElementById('searchbox');
let results = document.getElementById('results');

document.getElementById('universetype').oninput = query;
document.getElementById('coursetype').oninput = query;
document.getElementById('pagetype').oninput = query;
document.getElementById('snippettype').oninput = query;
searchbox.oninput = query;

function query() {
    let keyword = searchbox.value;

    if (keyword == '') {
        return;
    }

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