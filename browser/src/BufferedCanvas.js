'use strict'

import Size from './Size'

/**
 * A double buffered canvas. Required as canvas resizing & css transform is not atomic and can result in flickering.
 * This class has 2 canvasses that can be swapped. Ideally one would render to the invisible 'back' canvas, once done
 * a call to requestAnimation frame can be used to perform a swapBuffers(). This will make the 'back' canvas the 'front'
 * canvas, and effectivily make it visible. The 'front' canvas will become the 'back' canvas.
 */
export default class BufferedCanvas {
  /**
   * @param width
   * @param height
   * @return {BufferedCanvas}
   */
  static create (width, height) {
    const frontCanvas = document.createElement('canvas')
    frontCanvas.width = width
    frontCanvas.height = height
    frontCanvas.style.position = 'absolute'
    frontCanvas.style.display = 'inline'
    frontCanvas.style.zIndex = '0'
    const frontContext = frontCanvas.getContext('2d')
    frontContext.imageSmoothingEnabled = false

    const backCanvas = document.createElement('canvas')
    backCanvas.width = width
    backCanvas.height = height
    backCanvas.style.position = 'absolute'
    backCanvas.style.display = 'none'
    backCanvas.style.zIndex = '0'
    const backContext = backCanvas.getContext('2d')
    backContext.imageSmoothingEnabled = false

    return new BufferedCanvas(frontContext, backContext)
  }

  constructor (frontContext, backContext) {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.frontContext = frontContext
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.backContext = backContext
  }

  /**
   * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap}source
   * @param {number}width
   * @param {number}height
   * @param {Mat4|null} transformation
   */
  drawBackBuffer (source, width, height, transformation) {
    this._draw(this.backContext, source, width, height, transformation)
  }

  /**
   * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap}source
   * @param {number}width
   * @param {number}height
   * @param {Mat4|null} transformation
   */
  drawFrontBuffer (source, width, height, transformation) {
    this._draw(this.frontContext, source, width, height, transformation)
  }

  /**
   * @param {CanvasRenderingContext2D} context2d
   * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap}source
   * @param {number}width
   * @param {number}height
   * @param {Mat4} transformation
   * @private
   */
  _draw (context2d, source, width, height, transformation) {
    const canvas = context2d.canvas
    if (canvas.width !== width || canvas.height !== height) {
      // resizing clears the canvas
      canvas.width = width
      canvas.height = height
    } else {
      context2d.clearRect(0, 0, canvas.width, canvas.height)
    }
    context2d.drawImage(source, 0, 0)
    canvas.style.transform = transformation.toCssMatrix()
  }

  swapBuffers () {
    const oldFront = this.frontContext
    this.frontContext = this.backContext
    this.backContext = oldFront
    this.backContext.canvas.style.display = 'none'
    this.frontContext.canvas.style.display = 'inline'
  }

  /**
   * @param {number}index
   */
  set zIndex (index) {
    this.frontContext.canvas.style.zIndex = index.toString(10)
    this.backContext.canvas.style.zIndex = index.toString(10)
  }

  attach () {
    document.body.appendChild(this.frontContext.canvas)
    document.body.appendChild(this.backContext.canvas)
  }

  detach () {
    this._removeCanvas(this.frontContext)
    this._removeCanvas(this.backContext)
  }

  _removeCanvas (context) {
    const canvas = context.canvas
    const parent = canvas.parentElement
    if (parent) {
      parent.removeChild(canvas)
    }
  }

  /**
   * @return {Size}
   */
  size () {
    return Size.create(this.frontContext.canvas.width, this.frontContext.canvas.height)
  }

  /**
   * @param {string}cssClass
   */
  addCssClass (cssClass) {
    this.frontContext.canvas.classList.add(cssClass)
    this.backContext.canvas.classList.add(cssClass)
  }

  /**
   * @param {string}cssClass
   */
  removeCssClass (cssClass) {
    this.frontContext.canvas.classList.remove(cssClass)
    this.backContext.canvas.classList.remove(cssClass)
  }
}