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

postData('/query/snippet/b')
    .then(v => v.json())
    .then(json => {
        console.log(json);
    });