var euc = encodeURI, duc = decodeURI;

function TemplateTagsEscaper(start, end) {
  this.reNormal = new RegExp(start + '.*?'  + end, 'g');
  this.reEscaped = new RegExp(euc(start) + '.*?' + euc(end), 'g');
}

TemplateTagsEscaper.prototype.encode = function(input) {
  var encoded = input.replace(this.reNormal, function(replacement) {
    return euc(replacement);
  });
  return encoded;
};

TemplateTagsEscaper.prototype.decode = function(input) {
  var decoded = input.replace(this.reEscaped, function(replacement) {
    return duc(replacement);
  });
  return decoded;
}

module.exports = {
  TemplateTagsEscaper: TemplateTagsEscaper,
};
