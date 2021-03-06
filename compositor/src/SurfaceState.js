// Copyright 2019 Erik De Rijcke
//
// This file is part of Greenfield.
//
// Greenfield is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Greenfield is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Greenfield.  If not, see <https://www.gnu.org/licenses/>.

'use strict'

export default class SurfaceState {
  /**
   * @param {?WlBufferResource}wlBuffer
   * @param {?BufferContents}bufferContents
   * @param {Array<Rect>}bufferDamageRects
   * @param {number}opaquePixmanRegion
   * @param {number}inputPixmanRegion
   * @param {number}dx
   * @param {number}dy
   * @param {number}bufferTransform
   * @param {number}bufferScale
   * @param {Array<Callback>}frameCallbacks
   * @param {*}roleState
   */
  static create (
    wlBuffer,
    bufferContents,
    bufferDamageRects,
    opaquePixmanRegion,
    inputPixmanRegion,
    dx,
    dy,
    bufferTransform,
    bufferScale,
    frameCallbacks,
    roleState
  ) {
    return new SurfaceState(
      wlBuffer,
      bufferContents,
      bufferDamageRects,
      opaquePixmanRegion,
      inputPixmanRegion,
      dx,
      dy,
      bufferTransform,
      bufferScale,
      frameCallbacks,
      roleState
    )
  }

  /**
   * @param {?WlBufferResource}wlBuffer
   * @param {?BufferContents}bufferContents
   * @param {Array<Rect>}bufferDamageRects
   * @param {number}opaquePixmanRegion
   * @param {number}inputPixmanRegion
   * @param {number}dx
   * @param {number}dy
   * @param {number}bufferTransform
   * @param {number}bufferScale
   * @param {Array<Callback>}frameCallbacks
   * @param {*}roleState
   */
  constructor (
    wlBuffer,
    bufferContents,
    bufferDamageRects,
    opaquePixmanRegion,
    inputPixmanRegion,
    dx,
    dy,
    bufferTransform,
    bufferScale,
    frameCallbacks,
    roleState
  ) {
    /**
     * @type {?WlBufferResource}
     */
    this.wlBuffer = wlBuffer
    /**
     * @type {?BufferContents}
     */
    this.bufferContents = bufferContents
    /**
     * @type {Array<Rect>}
     */
    this.bufferDamageRects = bufferDamageRects
    /**
     * @type {number}
     */
    this.opaquePixmanRegion = opaquePixmanRegion
    /**
     * @type {number}
     */
    this.inputPixmanRegion = inputPixmanRegion
    /**
     * @type {number}
     */
    this.dx = dx
    /**
     * @type {number}
     */
    this.dy = dy
    /**
     * @type {number}
     */
    this.bufferTransform = bufferTransform
    /**
     * @type {number}
     */
    this.bufferScale = bufferScale
    /**
     * @type {Array<Callback>}
     */
    this.frameCallbacks = frameCallbacks
    /**
     * @type {*}
     */
    this.roleState = roleState
  }
}
