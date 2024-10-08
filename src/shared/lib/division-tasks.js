export default {
    localStorageKey: "divisionTasks",
    generateTasksAndWeights(calculatedTasks) {
        let DEFAULT_WEIGHT = 100;
        let tasks = [];
        let taskWeights = []
        for (let divisor = 1; divisor <= 10; divisor++) {
            for (let m = 10; m > 0; m--) {
                let dividend = divisor * m
                let id = dividend + ":" + divisor
                tasks.push({
                    "id": id,
                    "dividend": dividend,
                    "divisor": divisor,
                    "result": dividend / divisor,
                    "formula": `${dividend} : ${divisor}`,
                    "calculated": 0,
                    "wrong": 0,
                })

                let weight = DEFAULT_WEIGHT
                if (calculatedTasks != null && calculatedTasks[id] !== undefined) {
                    let task = calculatedTasks[id]
                    if (task.wrong > 0) {
                        weight = Number.parseInt(((task.wrong / task.calculated) * 100).toFixed(1));
                    }
                }
                taskWeights.push(weight)
            }
        }
        return {tasks, taskWeights}
    },
    sortTasks(tasks) {
        let sortedTasks = [];
        for (let key in tasks) {
            sortedTasks.push(tasks[key]);
        }
        sortedTasks.sort((a, b) => {
            if (a.divisor < b.divisor) return -1;
            if (a.divisor > b.divisor) return 1;

            if (a.dividend < b.dividend) return -1;
            if (a.dividend > b.dividend) return 1;
            return 0;
        });

        return sortedTasks;
    }
}
