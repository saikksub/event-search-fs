const fs = require('fs');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

/**
 * Get file type from path
 * @param {string} __path - target path
 * @returns {string} - file type
 */
function getlstat(__path) {
  if (__path) {
    const lstat = fs.lstatSync(__path);
    return (
    lstat.isFile() 
      ? 'file' 
      : lstat.isDirectory() 
      ? 'directory'
      : lstat.isBlockDevice() 
      ? 'blockdevice'
      : lstat.isCharacterDevice()
      ? 'characterdevice'
      : lstat.isFIFO() 
      ? 'fifo'
      : lstat.isSocket() 
      ? 'socket'
      : lstat.isSymbolicLink()
      ? 'symboliclink'
      : 'unknown'
    );
  }
  return 'unknown';
} 

/**
 * @class EventSearchFs
 * @param {string} __path - Base path from where you want to search. For example, '/Users/name/myfolder'
 * @param {string=} __name - Name of the file/directory that you want to search.
 * @emits result
 */
function EventSearchFs(__path, __name) {
  if (!(this instanceof EventSearchFs)) {
    return new EventSearchFs(__path, __name);
  }
  this.path = __path;
  this.name = __name;
  EventEmitter.call(this);
}

EventSearchFs.prototype = Object.create(EventEmitter.prototype);
EventSearchFs.prototype.constructor = EventSearchFs;
EventSearchFs.prototype.listFiles = function (__path, __name, context) {
  fs.readdir(__path, ['utf8'], function (err, files) {
    if (err) {
      return null;
    }
    if (files.constructor === [].constructor) {
      files.forEach((item) => {
        if (item === __name) {
          context.emit(
            'result',
            { 
              path: path.join(__path, __name),
              type: getlstat(path.join(__path, __name))
            }
          );
        }
        context.listFiles(
          path.join(__path, item),
          __name,
          context
        );
      });
    }
  });
}

/**
 * Start searching for file/directory from constructor path.
 * @throws {TypeError} - When initialized path and name, a `TypeError` thrown.
 */
EventSearchFs.prototype.list = function() {
  if (this.path && this.name) {
    this.listFiles(this.path, this.name, this);
  } else {
    throw new TypeError('Path or Name is invalid');
  }
}

module.exports = EventSearchFs;
