//@ts-nocheck
export function serialize(mixed_value: any) {
    var val, key, okey,
      ktype = '',
      vals = '',
      count = 0,
      _utf8Size = function(str) {
        var size = 0,
          i = 0,
          l = str.length,
          code = '';
        for (i = 0; i < l; i++) {
          code = str.charCodeAt(i);
          if (code < 0x0080) {
            size += 1;
          } else if (code < 0x0800) {
            size += 2;
          } else {
            size += 3;
          }
        }
        return size;
      },
      _getType = function(inp) {
        var match, key, cons, types, type = typeof inp;
  
        if (type === 'object' && !inp) {
          return 'null';
        }
  
        if (type === 'object') {
          if (!inp.constructor) {
            return 'object';
          }
          cons = inp.constructor.toString();
          match = cons.match(/(\w+)\(/);
          if (match) {
            cons = match[1].toLowerCase();
          }
          types = ['boolean', 'number', 'string', 'array'];
          for (key in types) {
            if (cons == types[key]) {
              type = types[key];
              break;
            }
          }
        }
        return type;
      },
      type = _getType(mixed_value);
  
    switch (type) {
    case 'function':
      val = '';
      break;
    case 'boolean':
      val = 'b:' + (mixed_value ? '1' : '0');
      break;
    case 'number':
      val = (Math.round(mixed_value) == mixed_value ? 'i' : 'd') + ':' + mixed_value;
      break;
    case 'string':
      val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"';
      break;
    case 'array':
    case 'object':
      val = 'a';
      /*
          if (type === 'object') {
            var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
            if (objname == undefined) {
              return;
            }
            objname[1] = this.serialize(objname[1]);
            val = 'O' + objname[1].substring(1, objname[1].length - 1);
          }
          */
  
      for (key in mixed_value) {
        if (mixed_value.hasOwnProperty(key)) {
          ktype = _getType(mixed_value[key]);
          if (ktype === 'function') {
            continue;
          }
  
          okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
          vals += serialize(okey) + serialize(mixed_value[key]);
          count++;
        }
      }
      val += ':' + count + ':{' + vals + '}';
      break;
    case 'undefined':
      // Fall-through
    default:
      // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
      val = 'N';
      break;
    }
    if (type !== 'object' && type !== 'array') {
      val += ';';
    }
    return val;
  }