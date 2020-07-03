import { ITask } from "src/model/task/task";
import { describe, Suite, it } from "mocha";
import { Repository } from "src/model/task/repository";
import * as assert from "assert";

describe("Task repository", () => {

    it("初期化された時には、2レコード含まれてること", () => {
        const repo = new Repository();
        const tasks = repo.ListTasks();
        assert.equal(tasks.length, 2);
    });

    it("1レコード追加できること", () => {
        const repo = new Repository();
        const newTasks: ITask = {
            id: 0,
            text: "new task",
        };
        repo.AddTask(newTasks);

        const tasks = repo.ListTasks();
        assert.equal(tasks.length, 3);
        assert.notEqual(tasks.find((task: ITask): boolean => {
            return task.text === "new task";
        }), undefined);
    });
})