class AssertError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AssertError';
        Error.captureStackTrace(this, AssertError);
    }
}

class Expect {
    constructor(value) {
        this.isNot = false;
        this.result = false;
        this.value = value;

        Object.defineProperty(this, 'not', {
            get: function () {
                this.isNot = !this.isNot;
                return this;
            }
        })
    }

    toMatch(regex) {
        this.result = regex.test(this.value);
        return this;
    }

    toBeNull() {
        this.result = this.value === null;
        return this;
    }

    toBeDefined() {
        this.result = this.value !== undefined;
        return this;
    }

    toBe(flag) {
        this.result = this.value === flag;
        return this;
    }

    error(message) {
        if (this.isNot) {
            if(this.result) throw new AssertError(message);
        }else {
            if(!this.result) throw new AssertError(message);
        }
    }
}

module.exports = function(value){
    return new Expect(value);
}