var Cleave = function (value, opts) {
  var item = this;
  opts.initValue = value;
  item.properties = Object.assign({}, opts);
  item.init();
}

Cleave.prototype = {
    init(){
        let item  = this;
        let pps = item.properties;
        pps.maxLength = getMaxLength(pps.blocks);
        item.isAndroid = isAndroid();

    }
}


function assign(target, opts) {
  target = target || {},
    opts = opts || {};

  // date
  target.date = !!opts.date;
  target.datePattern = opts.datePattern || ['d', 'm', 'Y'];

  // numeral
  target.numeral = !!opts.numeral;
  target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';

  //others
  target.blocks = opts.blocks || [];
  target.blocksLength = target.blocks.length;

  target.prefix = opts.prefix || '';
  target.prefixLength = target.prefix.length;

  target.delimiter = opts.delimiter;
  target.delimiterLength = target.delimiter.length;
  target.delimiters = opts.delimiters || [];

  target.result = '';
  return target;
}

function getMaxLength(blocks) {
    return blocks.reduce(function (previous, current) {
        return previous + current;
    }, 0);
}
function isAndroid() {
    return navigator && /android/i.test(navigator.userAgent);
}


export default Cleave;