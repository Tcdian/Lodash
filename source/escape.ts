interface HtmlEscapes {
    '&': '&amp;';
    '<': '&lt;';
    '>': '&gt;';
    '"': '&quot;';
    "'": '&#39;';
}

const htmlEscapes: HtmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const reUnescapedHtml = /[&<>"']/g;

function escape(string: string): string {
    return string.replace(reUnescapedHtml, (match) => htmlEscapes[match as keyof HtmlEscapes]);
}

export default escape;
