import Vue from "vue";

class EventGlobal {
    constructor() {
        this.vue = new Vue();
    }

    emit(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
    }

    fireWhenReady(event, data = null) {
        return function() {
            this.fire(event, data);
        }.bind(this);
    }
}

export default new EventGlobal();
