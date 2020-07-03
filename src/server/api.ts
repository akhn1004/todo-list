import express from "express";
import bodyParser from "body-parser"
import { Repository } from "../model/task/repository"
import { ITask } from "../model/task/task";


export interface IConfig {
    ListenHost: string;
    WebRoot: string;
}


export class API {
    private app: express.Express;
    private repository: Repository;
    private conf: IConfig;

    constructor(conf: IConfig) {
        this.repository = new Repository();
        this.app = express();
        this.conf = conf;
        this.routing();
    }

    public Run = () => {
        this.app.listen(this.conf.ListenHost);
    }

    private routing() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true}))

        // GETの場合タスクのリストを返す
        this.app.get("/api/tasks", this.list);
        // POSTの場合タスクを登録する。
        this.app.post("/api/tasks", this.create);
        
        this.app.use("/", express.static(this.conf.WebRoot));
    }


    


    private list = (req: express.Request, res: express.Response) => {
        const tasks = this.repository.ListTasks();
        res.json(tasks);
    }

    private create = (req: express.Request, res: express.Response) => {
        const task: ITask = req.body;
        const id = this.repository.AddTask(task);
        res.json({ id });
    }
}