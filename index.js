// console.log('Project 6 in JavaScript');

// Utility Functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize No. of parameters
let addParamCount = 0;

// Hide the Parameters Box initially
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

// if the user click on Parameters Box, hide the Json Box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
})

// if the user click on Json Box, hide the Parameters Box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// if user click on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', (e) => {
    e.preventDefault();
    let params = document.getElementById('params');
    let string = `<div class="row g-3 my-2 col">
                        <label for="parameterBox" class="col-sm-2 col-form-label">Parameter ${addParamCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addParamCount + 2}" value=""
                                placeholder="Enter Parameter ${addParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Value">
                        </div>
                            <button class="btn btn-primary removeBtn deleteParam"> - </button>
                    </div>
                        `;

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.append(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (items of deleteParam) {
        items.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    addParamCount++;
})

// If the user click on submit buuton
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user
    document.getElementById('responseJsonText').value = "Please wait.. Fetching response..."

    // Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used parameters option instead of json,collect all the the parameters in an object
    if (contentType == 'Parameters') {
        data = {};
        for (let i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in console for debagging 
    console.log('URL is :', url);
    console.log('requestType is :', requestType);
    console.log('contentType is :', contentType);
    console.log('data is :', data);

    // if the request type is GET , invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }

    // // if the request type is POST , invoke fetch api to create a post request
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }


});