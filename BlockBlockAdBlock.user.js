// ==UserScript==
// @name            Block BlockAdBlock
// @author          Mechazawa
// @namespace       Mechazawa
// @description     Acts like FuckAdBlock.js but always says that no adblock was detected.
// @license         WTFPl
// @version         2
// @include         *
// @run-at          document-start
// @updateURL       https://raw.githubusercontent.com/YJSoft/BlockBlockAdBlock/master/BlockBlockAdBlock.user.js
// @grant           none
// ==/UserScript==


(function(window) {
    var BlockAdBlock = function(options) {
        if(options !== undefined) 
            this.setOption(options);

        var self = this;
        window.addEventListener('load', function() {
            setTimeout(function() {
                if(self._options.checkOnLoad === true)
                    self.check(false);
            }, 1);
        }, false);
    }

    BlockAdBlock.prototype = {
        setOption : function(options, value) {
            if(value !== undefined) {
                var key = options;
                options = {};
                options[key] = value;
            }

            for(option in options)
                this._options[option] = options[option];

            return this;
        },

        _options : {
            checkOnLoad:    true,
            resetOnEnd:     true,
        },

        _var : {
            triggers: []   
        },

        check : function(ignore) {
            this.emitEvent(false);
            return true;
        },

        clearEvent : function() {
            this._var.triggers = [];
        },

        emitEvent : function(detected) {
            if(detected === false) {
                var fns = this._var.triggers;
                for(i in fns)
                    fns[i]();

                if(this._options.resetOnEnd === true)
                    this.clearEvent();
            }
            return this;
        },

        on : function(detected, fn) {
            if(detected === false)
                this._var.triggers.push(fn);
            return this;
        },

        onDetected : function(fn) {
            return this;
        },

        onNotDetected : function(fn) {
            return this.on(false, fn);
        }
    };

    window.blockAdBlock = new BlockAdBlock();
})(window);
