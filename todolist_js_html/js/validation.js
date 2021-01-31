function Valitation() {
    this.empty = function (input, message) {
        if (input === '') {
            alert(message);
            return false;
        };
        return true;
    };
    this.checkTask = function (input, listTask, message) {
        for (let i = 0; i < listTask.length; i++) {
            if (input.toLowerCase() === listTask[i].tasks.toLowerCase()) {
                alert(message);
                return false;
            };
        };
        return true;
    };
};