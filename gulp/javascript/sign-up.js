import xhr from 'xhr';
import serialize from 'form-serialize';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

const form = document.getElementById('sign_up');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = serialize(form, {
        hash: true,
        empty: true
    });

    sendSignUpRequest(data);
});

function sendSignUpRequest(formJSON) {
    return xhr({
        method: 'post',
        uri: '/sign-up',
        json: formJSON
    }, (err, res, body) => {
        const result = body.result;

        removeHighlights();
        removeMessages();

        switch (res.statusCode) {
            case 400: {
                const invalidInputs = getInvalidInputNodes(result);

                forEach(invalidInputs, input => addClass(input, 'b-input_error'));
                forEach(result, field => {
                    const inputNode = document.querySelector(`[name="${field.name}"]`);
                    addErrorMessage(inputNode, field.message);
                });

                break;
            }
            case 201: {
                const signUpNode = document.getElementById('sign_up');
                const successNode = document.querySelector('.b-success-sign-up');
                const { username, password } = formJSON;

                setDataToSuccessForm(username, password);
                addClass(signUpNode, '-hidden');
                removeClass(successNode, '-hidden');

                break;
            }
        }
    });
};

function setDataToSuccessForm(username, password) {
    const form = document.querySelector('.b-success-sign-up');
    const usernameNode = form.querySelector('[name="username"]');
    const passwordNode = form.querySelector('[name="password"]');

    usernameNode.value = username;
    passwordNode.value = password;
};

function removeHighlights() {
    const inputNodes = document.querySelectorAll('.b-input');
    forEach(inputNodes, input => removeClass(input, 'b-input_error'));
};

function removeMessages() {
    const messagesNodes = document.querySelectorAll('.b-form__error-message');
    forEach(messagesNodes, m => m.parentNode.removeChild(m));
};

function addErrorMessage(inputNode, message) {
    const rowNode = inputNode.parentNode;
    const messageNode = document.createElement('span');

    setText(messageNode, message);
    addClass(messageNode, 'b-form__error-message');
    rowNode.appendChild(messageNode);
};

function getInvalidInputFields(validationData) {
    return reduce(validationData, (acc, item, i) => {
        if (acc.indexOf(item.name) === -1) {
            return [...acc, item.name];
        }
        return acc;
    }, []);
};

function getInvalidInputNodes(validationData) {
    const fields = getInvalidInputFields(validationData);
    return map(fields, field => document.querySelector(`[name="${field}"]`));
};

function addClass(node, className) {
    if (node.classList) {
        node.classList.add(className);
    } else {
        node.className += ' ' + className;
    }
};

function removeClass(node, className) {
    if (node.classList) {
        node.classList.remove(className);
    } else {
        node.className = node.className.replace(
            new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi')
        , ' ');
    }
};

function setText(node, text) {
    if (node.textContent !== undefined) {
        node.textContent = text;
    } else {
        node.innerText = text;
    }
};
