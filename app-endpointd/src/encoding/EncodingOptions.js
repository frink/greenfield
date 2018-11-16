class EncodingOptions {
  /**
   * @param {number}encodingOptions
   * @return {number}
   */
  static enableSplitAlpha (encodingOptions) {
    return (encodingOptions | EncodingOptions._ALPHA)
  }

  /**
   * @param encodingOptions
   * @return {number}
   */
  static enableFullFrame (encodingOptions) {
    return (encodingOptions | EncodingOptions._FULL_FRAME)
  }
}

/**
 * @type {number}
 * @private
 */
EncodingOptions._ALPHA = (1 << 0)
/**
 * @type {number}
 * @private
 */
EncodingOptions._FULL_FRAME = (1 << 1)

module.exports = EncodingOptions
