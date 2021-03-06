// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      console.log('this is the row: ' + this.get(rowIndex));
      var count = 0;

      for (var i = 0; i < row.length; i++) {
        console.log('this is the current place in the row: ' + row[i]);
        console.log('this is the count: ' + count);
        if (row[i]) {
          count++;
        }
      }

      return count > 1;
    },

    // hasRowConflictAt: function(rowIndex) {
    //   var currentRow = this.get(rowIndex);
    //   console.log(currentRow);
    //   var total = currentRow.reduce((a, b) => a + b);
    //   console.log(total, 'totals');
    //   if (total > 1) {
    //     return true;
    //   }
    //   return false;
    // },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    //    hasAnyRowConflicts: function() {
    // var allRows = this.rows();
    // for (var idx in allRows) {
    //   if (hasRowConflictAt(idx)) {
    //     return true
    //   }
    //   return false;




    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // the board this.rows();
      // counter for each one
      // for loop
      // the rows
      // if board[i][colIndex]
      // count++
      // if count >= 1
      // return true
      // else
      // return false
      var board = this.rows();
      var counter = 0;
      for (var row of board) {
        if (row[colIndex]) {
          counter ++;
        }
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numCols = this.get('n');
      for (var i = 0; i < numCols; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create the board
      // loop through 1 column over and 1 row down
      // add values
      // if values > 1
      // return true
      // else
      // return false




      var n = majorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();
      var counter = 0;


      var n = majorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();
      var counter = 0;
      var num = majorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < board.length - n; i++) {
        // if ((i < board.length - 1) || (i < board[i].length)) {
        //   return;
        // }
        if (board[i][n]) {
          console.log(board[i][n]);
          counter ++;
        }
        num++;
      }
      console.log(counter);
      return counter > 1;
      var num = majorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < board.length - n; i++) {
        // if ((i < board.length - 1) || (i < board[i].length)) {
        //   return;
        // }
        if (board[i][n]) {
          console.log(board[i][n]);
          counter ++;
        }
        num++;
      }
      console.log(counter);
      return counter > 1;

      // return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // initialize board;
      // inititalize counter;

      // loop through columns in first row
      // run hasMajorDiagonalConflictAt
      // if truthy
      // increment counter

      // loop index 0 of all rows
      // run hasMajorDiagonalConflictAt
      // if truthy
      // increment counter

      // return counter > 1 comparison
      // this.attributes[0]
      // var board = this.rows();
      // var firstRow = this.attributes[0];
      // var counter = 0;

      // for (var i = 0; i < firstRow.length; i++) {
      //   if (this.hasAnyMajorDiagonalConflicts(i)) {
      //     counter++;
      //   }
      // }

      // for (var j = 0; j < board.length; j++) {
      //   if (this.hasMajorDiagonalConflictAt((board[j][0]))) {
      //     counter++;
      //   }
      // }
      // return counter > 1;

      for (var i = 0; i < this.rows().length - 1; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
