// Perform substitutions for i18n in text and attributes
export function apply_i18n(doc) {
    for(let node of doc.querySelectorAll('[data-i18n]')) {
        let text = browser.i18n.getMessage(node.dataset.i18n) || node.dataset.i18n;
        if(node.dataset.i18nAllowMarkup !== undefined) {
            node.insertAdjacentHTML('beforeend', text);
        } else {
            node.insertAdjacentText('beforeend', replaceEntities(text));
        }
    }
    for(let node of doc.querySelectorAll('[data-i18n-attrs]')) {
        for(let substitution of node.dataset.i18nAttrs.split(/\s+/g)) {
            let [attr, text] = substitution.split(':');
            text = browser.i18n.getMessage(text) || text;
            node.setAttribute(attr, replaceEntities(text));
        }
    }

    function replaceEntities(str) {
        let entities = {
            '&apos;': "'",
            '&lt;': "<",
            '&gt;': ">",
        };
        for(let [s, d] of Object.entries(entities)) {
            str = str.replace(s, d);
        }
        return str;
    }
}

// TODO: access key highlighting
