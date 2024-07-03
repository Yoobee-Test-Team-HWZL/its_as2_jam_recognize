const Pub = {
  // New window access link
  OPEN_URL(url) {
    window.open(url, "_blank");
  },

  // Go to the specified address
  JUMP_URL(url) {
    window.location = url;
  },

  // Current domain name
  DOMAIN_NAME(path) {
    return (
      window.location.protocol + "//" + window.location.host + (path || "")
    );
  },

  // ================================= 《 verify 》

  // Whether the regular match exists
  REG_TEST(reg, value) {
    var re = new RegExp(reg);
    if (re.test(value)) {
      return true;
    } else {
      return false;
    }
  },

  // Delete all Spaces in the string
  STRING_SPACE_ALL(str) {
    return str.replace(/\s/g, "");
  },

  // Delete the Spaces at the beginning and end of the string
  STRING_SPACE_HF(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

  // Delete the header space
  STRING_SPACE_H(str) {
    return str.replace(/(^\s*)/g, "");
  },

  // Delete trailing Spaces
  STRING_SPACE_F(str) {
    return str.replace(/(\s*$)/g, "");
  },

  // Determine whether it is positive (decimal point allowed, not negative)
  REG_IS_NUMBER(value) {
    return this.REG_TEST(/^\d+(\.\d+)?$/, value);
  },

  // Determine whether it is positive (decimal point allowed, not negative)
  REG_IS_NUMBER_FLOAT2(value) {
    return this.REG_TEST(/^\d+(?:\.\d{1,2})?$/, value);
  },

  // Determine whether it is a positive integer (including 0)
  REG_IS_INTEGER(value) {
    return this.REG_TEST(/^\d+$/, value);
  },

  // Determine whether it is a positive integer (excluding 0)
  REG_IS_INTEGER_POSITIVE(value) {
    return this.REG_TEST(/(^[1-9]\d*$)/, value);
  },

  // Check whether it is a mobile phone number
  REG_IS_PHONE(value) {
    return this.REG_TEST(/^1[3456789]\d{9}$/, value);
  },

  // Check whether it is an email address
  REG_IS_EMAIL(value) {
    return this.REG_TEST(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, value);
  },

  // =================================

  // Check whether the decimal point exceeds the specified number. true: exceeds false: does not exceed the specified number
  CHECK_NUMBER_DECIMAL(value, maxLength) {
    // Convert to string
    var valueString = `${value || ""}`;
    // Decimal length
    var decimalLength = 0;
    // Whether there is a decimal point
    if (valueString.includes(".")) {
      // Get decimal length
      decimalLength = valueString.split(".")[1].length;
    }
    return decimalLength > maxLength;
  },

  // Keep the decimal place
  // value: The value is a string
  // decimal：Keep the decimal place
  // isNumber：Whether to convert to Number. Default String
  // isComplete：If the decimal point is not enough, whether to complete with 0 tail
  // completeMax：The maximum number of completions is limited, 0: according to the actual completion, that is, the decimal point is several places
  KEEP_NUMBER_DECIMAL(value, decimal, isNumber, isComplete, completeMax = 0) {
    // Character string
    var valueString = `${value || 0}`;
    // Keep the decimal place
    var decimalCount = Math.max(0, decimal);
    // Complete quantity
    var completeMaxCount = Math.max(0, completeMax);
    // number
    var numberString = valueString;
    var decimalString = "";
    // Whether there is a decimal point
    if (valueString.includes(".")) {
      // segmentation
      var strs = valueString.split(".");
      // Records
      numberString = strs[0];
      decimalString = strs[1];
    }
    // Split point
    if (decimalString.length > decimalCount) {
      // Take the decimal point
      decimalString = decimalString.substring(0, decimalCount);
    }
    // The number of decimal places is not enough, whether to complete with 0
    if (isComplete && decimalString.length < decimalCount) {
      // Complete digit
      var completeCount = decimalCount - decimalString.length;
      // Inspection restriction
      if (completeMaxCount) {
        completeCount = Math.min(completeMaxCount, completeCount);
      }
      // complete
      if (completeCount) {
        for (let index = 0; index < completeCount; index++) {
          decimalString += "0";
        }
      }
    }
    // decimal
    if (decimalString.length) {
      // assembly
      numberString += `.${decimalString}`;
    }
    // Back
    return isNumber ? Number(numberString) : numberString;
  },

  // =================================

  // Gets the specified key value
  VALUE(obj, key) {
    // Current value
    var value = undefined;
    // Whether there is value
    if (obj && key) {
      // Assign
      value = obj;
      // Analysis brace
      if (key.includes("[") || key.includes("]")) {
        // Substitution symbol
        if (key.includes("[")) {
          key = key.replace(new RegExp("\\[", "gm"), ".");
          key = key.replace(new RegExp("\\]", "gm"), "");
        } else {
          key = key.replace(new RegExp("\\]", "gm"), ".");
        }
      }
      // disassemble
      const keys = key.split(".");
      // Filter out the available keys
      const newKeys = [];
      // filtration
      keys.forEach((itemKey) => {
        // If there is a value, add
        if (itemKey.length) {
          newKeys.push(itemKey);
        }
      });
      newKeys.some((itemKey) => {
        if (value) {
          value = value[itemKey];
        }
        return !value;
      });
    }
    return value;
  },

  // =================================

  // Project operation environment
  IS_DEBUG() {
    // Current host
    const host = window.location.host;
    // Method 1: The domain name contains the specified identifier and is a test environment
    return host.includes("localhost") || host.includes("test.");
    // Method 2: The test environment is not the official domain name
    // return host !== 'task.hepai.video'
  },

  //token
  ACCESS_TOKEN(value) {
    return this.CUSTOM("token", value);
  },

  //userinfo
  USER_INFO(value) {
    return this.CUSTOM("userinfo", value);
  },

  CUSTOM(key, value) {
    if (value === undefined) {
      return localStorage.getItem(key);
    } else {
      return localStorage.setItem(key, value);
    }
  },
};

export default Pub;
