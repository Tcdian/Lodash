const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const reUnescapedHtml = /[&<>"']/g;

function escape(string: string): string {
    return string.replace(reUnescapedHtml, (match) => htmlEscapes[match as keyof typeof htmlEscapes]);
}

export { escape };
