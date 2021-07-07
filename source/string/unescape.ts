const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
};

const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;

function unescape(string: string): string {
    return string.replace(reEscapedHtml, (match) => htmlUnescapes[match as keyof typeof htmlUnescapes]);
}

export { unescape };
