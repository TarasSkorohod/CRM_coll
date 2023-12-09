import './Tasks.css';
import Chart from "./Chart";
import TasksTable from "./TasksTable";
import {useState} from "react";

const data = [
    {all: 71, fresh: 5, scheduled: 47, overdue: 22, label: 'Prom', color: "#24CFDA", selected: true},
    {all: 57, fresh: 3, scheduled: 34, overdue: 20, label: 'OLX', color: "#EDDA2B", selected: true},
    {all: 39, fresh: 4, scheduled: 16, overdue: 19, label: 'Rozetka', color: "#46DA2E", selected: true},
    {all: 12, fresh: 2, scheduled: 7, overdue: 4, label: 'Hotprice', color: "#FC2828", selected: true},
    {all: 0, fresh: 0, scheduled: 0, overdue: 0, label: 'Bagway', color: "#FC9A28", selected: true},
    {all: 0, fresh: 0, scheduled: 0, overdue: 0, label: 'Facebook', color: "#979797", selected: true},
    {all: 0, fresh: 0, scheduled: 0, overdue: 0, label: 'Prom1', color: "pink", selected: true},
    {all: 0, fresh: 0, scheduled: 0, overdue: 0, label: 'Prom2', color: "blue", selected: true},
    {all: 0, fresh: 0, scheduled: 0, overdue: 0, label: 'Prom3', color: "#24CFDA", selected: true},
]

const Tasks = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="tasks-wrapper">
            <div className="tasks">
                <div className="tasks__head">
                    <div className="tasks__title">Задачі</div>

                    <button className="tasks__edit" onClick={() => setModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
                            <path
                                d="M24.4138 5.67821L18.8288 0.539052C18.643 0.368154 18.4225 0.232588 18.1799 0.140096C17.9372 0.0476051 17.6771 0 17.4144 0C17.1517 0 16.8916 0.0476051 16.6489 0.140096C16.4062 0.232588 16.1857 0.368154 16 0.539052L0.58626 14.7203C0.399734 14.8905 0.251852 15.0932 0.151209 15.3165C0.0505661 15.5397 -0.000829299 15.7792 1.01187e-05 16.0209V21.1601C1.01187e-05 21.648 0.210724 22.116 0.585796 22.4611C0.960869 22.8061 1.46958 23 2.00001 23H7.58626C7.849 23.0008 8.10929 22.9535 8.35199 22.8609C8.59469 22.7683 8.81497 22.6323 9.00001 22.4607L24.4138 8.28055C24.5995 8.1097 24.7469 7.90685 24.8474 7.68359C24.948 7.46033 24.9997 7.22104 24.9997 6.97938C24.9997 6.73772 24.948 6.49843 24.8474 6.27517C24.7469 6.05191 24.5995 5.84906 24.4138 5.67821ZM7.58626 21.1601H2.00001V16.0209L13 5.9013L18.5863 11.0404L7.58626 21.1601ZM20 9.7387L14.4138 4.6007L17.4138 1.8408L23 6.97881L20 9.7387Z"
                                fill="white"/>
                        </svg>
                    </button>
                </div>
                <Chart data={data} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
            </div>

            <TasksTable data={data}/>
        </div>
    );
};

export default Tasks;